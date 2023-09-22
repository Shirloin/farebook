package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
)

// CreateGroupRoom is the resolver for the createGroupRoom field.
func CreateGroupRoom(ctx context.Context, id string) (*model.GroupRoom, error) {
	groupRoom := &model.GroupRoom{
		ID:      uuid.NewString(),
		GroupID: id,
	}
	return groupRoom, DB.Save(&groupRoom).Error
}

// DeleteGroupRoom is the resolver for the deleteGroupRoom field.
func DeleteGroupRoom(ctx context.Context, id string) (*model.GroupRoom, error) {
	var room *model.GroupRoom
	if err := DB.Find(&room, "group_id = ?", id).Error; err != nil {
		return nil, err
	}
	return room, DB.Where("id = ?", room.ID).Delete(&room).Error
}

// GetGroupRoom is the resolver for the getGroupRoom field.
func GetGroupRoom(ctx context.Context, id string) (*model.GroupRoom, error) {
	var room *model.GroupRoom
	return room, DB.Preload("Group").Find(&room, "group_id = ?", id).Error
}

// GetMyGroupRoom is the resolver for the getMyGroupRoom field.
func GetMyGroupRoom(ctx context.Context, id string) ([]*model.GroupRoom, error) {
	var rooms []*model.GroupRoom
	groups, err := GetMyGroup(ctx, id)
	fmt.Println(id)
	if err != nil {
		return nil, err
	}
	for _, g := range groups {
		fmt.Println(g.Name)
		room, err := GetGroupRoom(ctx, g.ID)
		if err != nil {
			return nil, err
		}
		rooms = append(rooms, room)
	}
	return rooms, nil
}
