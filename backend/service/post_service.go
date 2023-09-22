package service

import (
	"context"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/helper"
)

// CreatePost is the resolver for the createPost field.
func CreatePost(ctx context.Context, inputPost model.NewPost) (*model.Post, error) {
	var files []model.File
	postId := uuid.NewString()
	post := &model.Post{
		ID:        postId,
		Content:   inputPost.Content,
		UserID:    inputPost.UserID,
		CreatedAt: time.Now(),
		Privacy:   inputPost.Privacy,
	}
	if inputPost.GroupID != nil && *inputPost.GroupID != "" {
		var group model.Group
		if err := DB.Find(&group, "id = ?", *inputPost.GroupID).Error; err != nil {
			return nil, err
		}
		post.GroupID = inputPost.GroupID
	}
	if err := DB.Save(&post).Error; err != nil {
		return nil, err
	}
	if inputPost.File != nil {
		for _, currFile := range inputPost.File {
			fileType := helper.FileType(currFile.Filename)
			filePath, err := UploadFile(currFile)
			if err != nil {
				return nil, err
			}
			file := model.File{
				ID:     uuid.NewString(),
				Name:   filePath,
				Type:   fileType,
				PostID: postId,
			}
			if err := DB.Save(&file).Error; err != nil {
				return nil, err
			}
			files = append(files, file)
		}
	}
	_, err := SendNotification(ctx, inputPost.UserID, "Create Post")
	if err != nil {
		return nil, err
	}
	return post, nil
}

// UpdatePostPrivacy is the resolver for the updatePostPrivacy field.
func UpdatePostPrivacy(ctx context.Context, id string, privacy string) (*model.Post, error) {
	post, err := GetPost(ctx, id)
	if err != nil {
		return nil, err
	}
	post.Privacy = privacy
	return post, DB.Save(&post).Error
}

// DeletePost is the resolver for the deletePost field.
func DeletePost(ctx context.Context, id string) (*model.Post, error) {
	var post *model.Post
	if err := DB.Preload("Comment").Preload("File").Find(&post, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return post, DB.Where("id = ?", id).Delete(&post).Error
}

// GetPost is the resolver for the getPost field.
func GetPost(ctx context.Context, id string) (*model.Post, error) {
	var post *model.Post
	return post, DB.Find(&post, "id = ?", id).Error
}

func GetAllPost(ctx context.Context) ([]*model.Post, error) {
	var post []*model.Post
	return post, DB.Preload("Comment").Preload("File").Preload("Group").Order("created_at DESC").Find(&post).Error
}

// GetUserPost is the resolver for the getUserPost field.
func GetUserPost(ctx context.Context, id string) ([]*model.Post, error) {
	var post []*model.Post
	return post, DB.Preload("Comment").Preload("File").Find(&post, "user_id = ?", id).Error
}

// GetSearchPost is the resolver for the getSearchPost field.
func GetSearchPost(ctx context.Context, str string) ([]*model.Post, error) {
	var post []*model.Post
	user := ctx.Value("TokenValue").(*model.User)
	searchPattern := "%" + strings.ToLower(str) + "%"
	err := DB.Preload("Comment").Preload("File").Where("LOWER(content) LIKE ?", searchPattern).Find(&post).Error
	if err != nil {
		return nil, err
	}
	var filteredPosts []*model.Post

	for _, p := range post {
		if p.UserID == user.ID || IsAlreadyFriend(user.ID, p.UserID) {
			filteredPosts = append(filteredPosts, p)
		}
	}

	return filteredPosts, nil
}

func GetGroupPost(ctx context.Context, id string) ([]*model.Post, error) {
	var post []*model.Post
	return post, DB.Preload("Comment").Preload("File").Preload("Group").Where("group_id = ?", id).Find(&post).Error
}
