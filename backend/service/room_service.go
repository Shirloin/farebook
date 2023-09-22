package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
)

// CreateRoom is the resolver for the createRoom field.
func CreateRoom(ctx context.Context, inputRoom model.NewRoom) (*model.Room, error) {
	room := &model.Room{
		ID:          uuid.NewString(),
		User_One_ID: inputRoom.UserOneID,
		User_Two_ID: inputRoom.UserTwoID,
	}
	return room, DB.Save(&room).Error
}

// GetRoom is the resolver for the getRoom field.
func GetRoom(ctx context.Context, inputRoom model.NewRoom) (*model.Room, error) {
	var room *model.Room
	if err := DB.First(&room, "user_one_id = ? AND user_two_id = ? ", inputRoom.UserOneID, inputRoom.UserTwoID).Error; err != nil {
		if err = DB.First(&room, "user_two_id = ? AND user_one_id = ? ", inputRoom.UserOneID, inputRoom.UserTwoID).Error; err != nil {
			return nil, err
		}
	}
	return room, nil
}
