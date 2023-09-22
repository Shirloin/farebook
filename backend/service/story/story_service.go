package story

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/service"
)

// CreateStory is the resolver for the createStory field.
func CreateStory(ctx context.Context, inputStory model.NewStory) (*model.Story, error) {
	story := &model.Story{
		ID:        uuid.NewString(),
		Content:   inputStory.File,
		UserID:    inputStory.UserID,
		CreatedAt: time.Now(),
		Privacy:   inputStory.Privacy,
	}
	_, err := service.SendNotification(ctx, inputStory.UserID, "Create Story")
	if err != nil {
		return nil, err
	}
	return story, service.DB.Save(&story).Error
}

// GetMyStory is the resolver for the getMyStory field.
func GetMyStory(ctx context.Context, id string) ([]*model.Story, error) {
	var story []*model.Story
	twentyFourHoursAgo := time.Now().Add(-24 * time.Hour)
	return story, service.DB.Find(&story, "user_id = ? AND created_at > ?", id, twentyFourHoursAgo).Error
}

// GetFriendStory is the resolver for the getFriendStory field.
func GetFriendStory(ctx context.Context, id string) ([]*model.Story, error) {
	var story []*model.Story
	subqueryUserOne := service.DB.Table("friends").Select("user_two_id").Where("user_one_id = ? AND status = ?", id, true)
	subqueryUserTwo := service.DB.Table("friends").Select("user_one_id").Where("user_two_id = ? AND status = ?", id, true)

	twentyFourHoursAgo := time.Now().Add(-24 * time.Hour)
	return story, service.DB.Where("user_id IN (?) OR user_id IN (?)", subqueryUserOne, subqueryUserTwo).
		Where("created_at > ?", twentyFourHoursAgo).
		Preload("User").
		Find(&story).Error
}

// User is the resolver for the user field.
func User(ctx context.Context, obj *model.Story) (*model.User, error) {
	var user *model.User
	twentyFourHoursAgo := time.Now().Add(-24 * time.Hour)
	return user, service.DB.Preload("Stories", "created_at > ?", twentyFourHoursAgo).Find(&user, "id = ?", obj.UserID).Error
}

// GetStoryByUser is the resolver for the getStoryByUser field.
func GetStoryByUser(ctx context.Context, id string) (*model.User, error) {
	var user *model.User
	twentyFourHoursAgo := time.Now().Add(-24 * time.Hour)
	return user, service.DB.Preload("Stories", "created_at > ?", twentyFourHoursAgo).Find(&user, "id = ? ", id).Error
}

// GetStoryByFriend is the resolver for the getStoryByFriend field.
func GetStoryByFriend(ctx context.Context, id string) ([]*model.User, error) {
	var users []*model.User
	twentyFourHoursAgo := time.Now().Add(-24 * time.Hour)
	subqueryUserOne := service.DB.Table("friends").Select("user_two_id").Where("user_one_id = ? AND status = ?", id, true)
	subqueryUserTwo := service.DB.Table("friends").Select("user_one_id").Where("user_two_id = ? AND status = ?", id, true)
	return users, service.DB.Preload("Stories", "created_at > ?", twentyFourHoursAgo).Where("id IN (?) OR id IN (?)", subqueryUserOne, subqueryUserTwo).
		Find(&users).Error
}
