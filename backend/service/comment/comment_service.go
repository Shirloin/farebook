package comment

import (
	"context"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/service"
)

// User is the resolver for the user field.
func User(ctx context.Context, obj *model.Comment) (*model.User, error) {
	var user *model.User
	return user, service.DB.Find(&user, "id = ?", obj.UserID).Error
}

// Post is the resolver for the post field.
func Post(ctx context.Context, obj *model.Comment) (*model.Post, error) {
	var post *model.Post
	return post, service.DB.Find(&post, "id = ?", obj.PostID).Error
}

// Parent is the resolver for the parent field.
func Parent(ctx context.Context, obj *model.Comment) (*model.Comment, error) {
	var comment *model.Comment
	return comment, service.DB.Find(&comment, "id = ?", obj.ParentID).Error
}

// Replies is the resolver for the replies field.
func Replies(ctx context.Context, obj *model.Comment) ([]*model.Comment, error) {
	var comments []*model.Comment
	return comments, service.DB.Find(&comments, "parent_id = ?", obj.ID).Error
}

// CreateComment is the resolver for the createComment field.
func CreateComment(ctx context.Context, inputComment model.NewComment) (*model.Comment, error) {
	comment := &model.Comment{
		ID:     uuid.NewString(),
		Text:   inputComment.Text,
		UserID: inputComment.UserID,
		PostID: inputComment.PostID,
	}
	if inputComment.Parent != nil {
		comment.ParentID = inputComment.Parent
	}

	err := service.DB.Save(&comment).Error
	if err != nil {
		return nil, err
	}

	curr := ctx.Value("TokenValue").(*model.User)

	user, err := service.GetUser(ctx, inputComment.UserID)
	if err != nil {
		return nil, err
	}
	post, err := service.GetPost(ctx, inputComment.PostID)
	if err != nil {
		return nil, err
	}
	inputNotif := &model.NewNotification{
		SenderID:   inputComment.UserID,
		ReceiverID: &post.UserID,
		Message:    user.Firstname + " " + user.Lastname + " comment to your post",
		Type:       "Comment Post",
	}
	if inputComment.UserID != curr.ID {
		_, err = service.CreateNotification(ctx, *inputNotif)
		if err != nil {
			return nil, err
		}
	}

	return comment, nil
}

// GetComment is the resolver for the getComment field.
func GetComment(ctx context.Context, id string) ([]*model.Comment, error) {
	var comment []*model.Comment
	return comment, service.DB.Find(&comment, "post_id = ? AND parent_id IS NULL", id).Error
}
