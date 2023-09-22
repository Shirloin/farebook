package service

import (
	"context"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/shirloin/backend/database"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/helper"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

var DB = database.GetInstance()

func CreateUser(ctx context.Context, inputUser model.NewUser) (*model.User, error) {
	password, err := helper.EncryptPassword(inputUser.Password)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	user := &model.User{
		ID:         uuid.NewString(),
		Firstname:  inputUser.Firstname,
		Lastname:   inputUser.Lastname,
		Email:      inputUser.Email,
		Password:   password,
		Dob:        inputUser.Dob,
		Gender:     inputUser.Gender,
		Image:      "https://bit.ly/3mCSn2i",
		IsVerified: false,
	}
	err = DB.Save(&user).Error
	if err != nil {
		return nil, &gqlerror.Error{
			Message: "Email must be unique",
			Extensions: map[string]interface{}{
				"code": "Email must be unique",
			},
		}
	}
	verificationURL := "http://localhost:5173/verification"
	err = SendEmail(user.Email, verificationURL)
	if err != nil {
		return nil, err
	}
	return user, err
}

func UpdateUser(ctx context.Context, id string, inputUser model.NewUser) (*model.User, error) {
	var user *model.User
	if err := DB.First(&user, "id = ?", id).Error; err != nil {
		return nil, err
	}

	var filename string
	if inputUser.Image != nil {
		var err error
		filename, err = UploadFile(inputUser.Image)
		if err != nil {
			return nil, err
		}
	}
	if filename == "" {
		filename = user.Image
	}
	user.Firstname = inputUser.Firstname
	user.Lastname = inputUser.Lastname
	user.Email = inputUser.Email
	user.Dob = inputUser.Dob
	user.Gender = inputUser.Gender
	user.Image = filename
	return user, DB.Save(&user).Error
}

func VerifyUser(ctx context.Context, email string) (*model.User, error) {
	email = email + "@gmail.com"
	user, err := GetUserByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	fmt.Println("User Verified")
	user.IsVerified = true
	return user, DB.Save(&user).Error
}

func GetUser(ctx context.Context, id string) (*model.User, error) {
	var user *model.User
	err := DB.First(&user, "id = ?", id).Error
	return user, err
}

func GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	var user *model.User
	if err := DB.Model(user).Where("email like ?", email).Take(&user).Error; err != nil {
		fmt.Println("Username not found")
		return nil, err
	}
	return user, nil
}

func GetSearchUser(ctx context.Context, str string) ([]*model.User, error) {
	var users []*model.User
	searchPattern := "%" + strings.ToLower(str) + "%"
	return users, DB.Where("LOWER(CONCAT(firstname, ' ', lastname)) LIKE ? AND is_verified = true", searchPattern).Find(&users).Error
}

func Notifications(ctx context.Context, obj *model.User) ([]*model.Notification, error) {
	var notifications []*model.Notification
	return notifications, DB.Find(&notifications, "receiver_id = ?", obj.ID).Error
}
