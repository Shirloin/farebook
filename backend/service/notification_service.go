package service

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/shirloin/backend/graph/model"
)

// CreateNotification is the resolver for the createNotification field.
func CreateNotification(ctx context.Context, inputNotif model.NewNotification) (*model.Notification, error) {
	notif := &model.Notification{
		ID:         uuid.NewString(),
		CreatedAt:  time.Now(),
		SenderID:   inputNotif.SenderID,
		ReceiverID: *inputNotif.ReceiverID,
		Message:    inputNotif.Message,
		Type:       inputNotif.Type,
		Status:     false,
	}
	if inputNotif.Content != nil {
		notif.Content = *inputNotif.Content
	}
	fmt.Println("Notification Created")
	return notif, DB.Save(&notif).Error
}

// SendNotification is the resolver for the sendNotification field.
func SendNotification(ctx context.Context, id string, typeArg string) ([]*model.User, error) {
	friends, err := GetFriend(ctx, id)
	if err != nil {
		return nil, err
	}
	user, err := GetUser(ctx, id)
	if err != nil {
		return nil, err
	}
	inputNotif := &model.NewNotification{
		SenderID: id,
		Type:     typeArg,
	}
	if typeArg == "Create Story" {
		inputNotif.Message = user.Firstname + " " + user.Lastname + " has created a new story"
	} else if typeArg == "Create Post" {
		inputNotif.Message = user.Firstname + " " + user.Lastname + " has created a new post"
	}
	for _, f := range friends {
		inputNotif.ReceiverID = &f.ID
		_, err = CreateNotification(ctx, *inputNotif)
		if err != nil {
			return nil, err
		}
	}
	fmt.Println("Send Notif To friend")
	return friends, nil
}

// UpdateNotificationStatus is the resolver for the updateNotificationStatus field.
func UpdateNotificationStatus(ctx context.Context, id string) (*model.Notification, error) {
	var notif *model.Notification
	if err := DB.First(&notif, "id = ?", id).Error; err != nil {
		return nil, err
	}
	fmt.Println(notif.Message)
	notif.Status = true
	return notif, DB.Save(&notif).Error
}

// Sender is the resolver for the sender field.
func Sender(ctx context.Context, obj *model.Notification) (*model.User, error) {
	return GetUser(ctx, obj.SenderID)
}

// Receiver is the resolver for the receiver field.
func Receiver(ctx context.Context, obj *model.Notification) (*model.User, error) {
	return GetUser(ctx, obj.ReceiverID)
}

// GetNotification is the resolver for the getNotification field.
func GetNotification(ctx context.Context, id string) ([]*model.Notification, error) {
	var notif []*model.Notification
	return notif, DB.Order("created_at DESC").Find(&notif, "receiver_id = ?", id).Error
}
