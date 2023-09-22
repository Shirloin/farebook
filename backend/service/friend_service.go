package service

import (
	"context"
	"fmt"

	"github.com/shirloin/backend/graph/model"
)

func UserOne(ctx context.Context, obj *model.Friend) (string, error) {
	fmt.Println("Pass3")
	user, err := GetUser(ctx, obj.User_OneID)
	if err != nil {
		return "", err
	}
	fmt.Println("Pass4")
	return user.ID, nil
}

func UserTwo(ctx context.Context, obj *model.Friend) (string, error) {
	fmt.Println("Pass5")
	user, err := GetUser(ctx, obj.User_TwoID)
	if err != nil {
		return "", err
	}
	fmt.Println("Pass6")
	return user.ID, nil
}

func AddFriend(ctx context.Context, inputFriend model.InputFriend) (*model.Friend, error) {
	friend := &model.Friend{
		User_OneID: inputFriend.UserOne,
		User_TwoID: inputFriend.UserTwo,
		Status:     false,
	}
	user, err := GetUser(ctx, inputFriend.UserTwo)
	if err != nil {
		return nil, err
	}
	inputNotif := &model.NewNotification{
		SenderID:   inputFriend.UserOne,
		ReceiverID: &inputFriend.UserTwo,
		Message:    "You have a new friend request " + user.Firstname + " " + user.Lastname,
		Type:       "Friend Request",
	}
	_, err = CreateNotification(ctx, *inputNotif)
	if err != nil {
		return nil, err
	}
	return friend, DB.Save(&friend).Error
}

// ConfirmFriendRequest is the resolver for the confirmFriendRequest field.
func ConfirmFriendRequest(ctx context.Context, inputFriend model.InputFriend) (*model.Friend, error) {
	var friend *model.Friend
	result := DB.Where("user_one_id = ? AND user_two_id = ?", inputFriend.UserOne, inputFriend.UserTwo).First(&friend)
	if result.Error != nil {
		return nil, result.Error
	}
	friend.Status = true
	if err := DB.Save(&friend).Error; err != nil {
		return nil, err
	}
	//Create Room
	inputRoom := &model.NewRoom{
		UserOneID: inputFriend.UserOne,
		UserTwoID: inputFriend.UserTwo,
	}
	_, err := CreateRoom(ctx, *inputRoom)
	if err != nil {
		return nil, err
	}
	//Create Notif
	user, err := GetUser(ctx, inputFriend.UserTwo)
	if err != nil {
		return nil, err
	}
	inputNotif := &model.NewNotification{
		SenderID:   friend.User_TwoID,
		ReceiverID: &friend.User_OneID,
		Message:    user.Firstname + " " + user.Lastname + " has confirmed you friend request",
		Type:       "Confirm Friend Request",
	}
	_, err = CreateNotification(ctx, *inputNotif)
	if err != nil {
		return nil, err
	}
	return friend, nil
}

// RemoveFriendRequest is the resolver for the removeFriendRequest field.
func RemoveFriendRequest(ctx context.Context, inputFriend model.InputFriend) (*model.Friend, error) {
	var friend *model.Friend
	result := DB.Where("user_one_id = ? AND user_two_id = ?", inputFriend.UserOne, inputFriend.UserTwo).First(&friend)
	if result.Error != nil {
		return nil, result.Error
	}
	return friend, DB.Delete(&friend).Error
}

// GetFriend is the resolver for the getFriend field.
func GetFriend(ctx context.Context, id string) ([]*model.User, error) {
	var friends []*model.Friend
	var users []*model.User
	result := DB.Where("user_one_id = ? AND status = ? ", id, true).Find(&friends)
	if result.Error != nil {
		return nil, result.Error
	}
	for _, friend := range friends {
		user, err := GetUser(ctx, friend.User_TwoID)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	result = DB.Where("user_two_id = ? AND status = ? ", id, true).Find(&friends)
	if result.Error != nil {
		return nil, result.Error
	}
	for _, friend := range friends {
		user, err := GetUser(ctx, friend.User_OneID)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

// GetFriendRequest is the resolver for the getFriendRequest field.
func GetFriendRequest(ctx context.Context, id string) ([]*model.User, error) {
	var friends []*model.Friend
	var users []*model.User
	result := DB.Where("user_two_id = ? AND status = ?", id, false).Find(&friends)
	if result.Error != nil {
		return nil, result.Error
	}
	for _, friend := range friends {
		user, err := GetUser(ctx, friend.User_OneID)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

// GetPeopleYouMayKnow is the resolver for the getPeopleYouMayKnow field.
func GetPeopleYouMayKnow(ctx context.Context, id string) ([]*model.User, error) {
	var suggestions []*model.User

	myFriends, err := GetFriend(ctx, id)
	for _, myFriend := range myFriends {
		friendFriends, err := GetFriend(ctx, myFriend.ID)
		if err != nil {
			return nil, err
		}
		fmt.Println(myFriend.Firstname)

		for _, friendFriend := range friendFriends {
			fmt.Println(friendFriend.Firstname)
			fmt.Println(IsAlreadyFriend(id, friendFriend.ID))
			if !IsAlreadyFriend(id, friendFriend.ID) && id != friendFriend.ID {
				fmt.Println("append")
				suggestions = append(suggestions, friendFriend)
			}
		}
	}

	return suggestions, err
}

// GetMutuals is the resolver for the getMutuals field.
func GetMutuals(ctx context.Context, inputFriend model.InputFriend) ([]*model.User, error) {
	var users []*model.User
	user1_friends, err := GetFriend(ctx, inputFriend.UserOne)
	if err != nil {
		return nil, err
	}
	user2_friends, err := GetFriend(ctx, inputFriend.UserTwo)
	if err != nil {
		return nil, err
	}

	for _, user1_friend := range user1_friends {
		for _, user2_friend := range user2_friends {
			if user1_friend.ID == user2_friend.ID {
				user, err := GetUser(ctx, user1_friend.ID)
				if err != nil {
					return nil, err
				}
				users = append(users, user)
			}
		}
	}
	return users, nil
}

// IsFriend is the resolver for the isFriend field.
func IsFriend(ctx context.Context, inputFriend model.InputFriend) (bool, error) {
	var count int64
	user1 := inputFriend.UserOne
	user2 := inputFriend.UserTwo
	DB.Table("friends").Where("(user_one_id = ? AND user_two_id = ? AND status = ?) OR (user_one_id = ? AND user_two_id = ? AND status = ?)",
		user1, user2, true, user2, user1, true).Count(&count)
	return count > 0, nil
}

func IsAlreadyFriend(user1 string, user2 string) bool {
	var count int64
	DB.Table("friends").Where("(user_one_id = ? AND user_two_id = ? AND status = ?) OR (user_one_id = ? AND user_two_id = ? AND status = ?)",
		user1, user2, true, user2, user1, true).Count(&count)
	fmt.Println(count)
	return count > 0
}
