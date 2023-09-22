package service

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
)

// Members is the resolver for the members field.
func Members(ctx context.Context, obj *model.Group) ([]*model.Member, error) {
	var member []*model.Member
	return member, DB.Find(&member, "group_id = ? AND confirmed = ?", obj.ID, true).Error
}

// CreateGroup is the resolver for the createGroup field.
func CreateGroup(ctx context.Context, inputGroup model.NewGroup) (*model.Group, error) {
	group := &model.Group{
		ID:        uuid.NewString(),
		Name:      inputGroup.Name,
		Privacy:   inputGroup.Privacy,
		Image:     "data:image/jpeg;base64,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",
		CreatedAt: time.Now(),
	}
	if err := DB.Save(&group).Error; err != nil {
		return nil, err
	}
	_, err := CreateGroupRoom(ctx, group.ID)
	if err != nil {
		return nil, err
	}

	return group, nil
}

// UpdateGroup is the resolver for the updateGroup field.
func UpdateGroup(ctx context.Context, id string, inputGroup model.NewGroup) (*model.Group, error) {
	var group *model.Group
	if err := DB.First(&group, "id = ?", id).Error; err != nil {
		return nil, err
	}
	group.Name = inputGroup.Name
	group.Privacy = inputGroup.Privacy
	if inputGroup.Image != nil {
		filePath, err := UploadFile(inputGroup.Image)
		if err != nil {
			return nil, err
		}
		group.Image = filePath
	}
	return group, DB.Save(&group).Error
}

// DeleteGroup is the resolver for the deleteGroup field.
func DeleteGroup(ctx context.Context, id string) (*model.Group, error) {
	var group *model.Group
	if err := DB.Preload("Posts").Preload("Members").First(&group, "id = ?", id).Error; err != nil {
		return nil, err
	}
	_, err := DeleteGroupRoom(ctx, group.ID)
	if err != nil {
		return nil, err
	}

	return group, DB.Delete(&group).Error
}

// GetMyGroup is the resolver for the getMyGroup field.
func GetMyGroup(ctx context.Context, id string) ([]*model.Group, error) {
	var group []*model.Group
	var member []*model.Member
	fmt.Println("Get Group")
	if err := DB.Find(&member, "user_id = ? AND confirmed = ?", id, true).Error; err != nil {
		return nil, err
	}
	for _, m := range member {
		var g *model.Group
		if err := DB.Preload("Members").Find(&g, "id = ?", m.GroupID).Error; err != nil {
			return nil, err
		}
		fmt.Println(g.Name)
		group = append(group, g)
	}
	return group, nil
}

// GetGroup is the resolver for the getGroup field.
func GetGroup(ctx context.Context, id string) (*model.Group, error) {
	var group *model.Group
	return group, DB.Preload("Members").Find(&group, "id = ?", id).Error
}

// GetAllGroup is the resolver for the getAllGroup field.
func GetAllGroup(ctx context.Context) ([]*model.Group, error) {
	var group []*model.Group
	return group, DB.Preload("Members").Find(&group, "privacy = ?", "Public").Error
}
