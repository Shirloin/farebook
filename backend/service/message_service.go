package service

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
)

// Room is the resolver for the room field.
func Room(ctx context.Context, obj *model.Message) (*model.Room, error) {
	var room *model.Room
	return room, DB.First(&room, "id = ?", obj.RoomID).Error
}

// User is the resolver for the user field.
func User(ctx context.Context, obj *model.Message) (*model.User, error) {
	var user *model.User
	return user, DB.First(&user, "id = ?", obj.UserID).Error
}

// CreateMessage is the resolver for the createMessage field.
func CreateMessage(ctx context.Context, inputMessage model.NewMessage) (*model.Message, error) {
	message := &model.Message{
		ID:        uuid.NewString(),
		RoomID:    inputMessage.RoomID,
		UserID:    inputMessage.UserID,
		Message:   inputMessage.Message,
		Type:      "",
		CreatedAt: time.Now(),
	}
	if inputMessage.File != nil {
		contentType := inputMessage.File.ContentType
		fmt.Println(contentType)
	}
	return message, DB.Save(&message).Error
}

// GetMessages is the resolver for the getMessages field.
func GetMessages(ctx context.Context, roomID string) ([]*model.Message, error) {
	var message []*model.Message
	return message, DB.Find(&message, "room_id = ?", roomID).Error
}

// GetUsers is the resolver for the getUsers field.
func GetUsers(ctx context.Context, roomID string) ([]*model.User, error) {
	var room *model.Room
	if err := DB.Find(&room, "id = ?", roomID).Error; err != nil {
		return nil, err
	}
	var users []*model.User
	user, err := GetUser(ctx, room.User_One_ID)
	if err != nil {
		return nil, err
	}
	users = append(users, user)
	user, err = GetUser(ctx, room.User_Two_ID)
	if err != nil {
		return nil, err
	}
	users = append(users, user)
	return users, nil
}
