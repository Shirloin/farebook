package service

import (
	"context"

	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/helper"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func Login(ctx context.Context, email string, password string) (*model.LoginResponse, error) {
	user, err := GetUserByEmail(ctx, email)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email not found",
				Extensions: map[string]interface{}{
					"code": "EMAIL_NOT_FOUND",
				},
			}
		}
		return nil, err
	}
	if !helper.ComparePassword(user.Password, password) {
		return nil, &gqlerror.Error{
			Message: "Wrong Password",
			Extensions: map[string]interface{}{
				"code": "WRONG_PASSWORD",
			},
		}
	}

	if !user.IsVerified {
		return nil, &gqlerror.Error{
			Message: "User has not been verified",
			Extensions: map[string]interface{}{
				"code": "User has not been verified",
			},
		}
	}

	token, err := JwtGenerateToken(user)
	if err != nil {
		return nil, err
	}

	// ctx = context.WithValue(ctx, "TokenValue", token)
	response := &model.LoginResponse{
		Token: token,
		User:  user,
	}

	return response, nil
}
