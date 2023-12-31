package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"fmt"

	"github.com/shirloin/backend/graph"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/service"
)

// Room is the resolver for the room field.
func (r *messageResolver) Room(ctx context.Context, obj *model.Message) (*model.Room, error) {
	return service.Room(ctx, obj)
}

// User is the resolver for the user field.
func (r *messageResolver) User(ctx context.Context, obj *model.Message) (*model.User, error) {
	return service.User(ctx, obj)
}

// CreateMessage is the resolver for the createMessage field.
func (r *mutationResolver) CreateMessage(ctx context.Context, inputMessage model.NewMessage) (*model.Message, error) {
	message, err := service.CreateMessage(ctx, inputMessage)
	if err != nil {
		return nil, err
	}
	var messages []*model.Message
	if err := r.DB.Find(&messages, "room_id = ?", inputMessage.RoomID).Error; err != nil {
		close(r.messageChannel[inputMessage.RoomID][inputMessage.UserID])
	}
	fmt.Println("Pass 1")
	for _, ch := range r.messageChannel[inputMessage.RoomID] {
		ch <- messages
	}
	fmt.Println("Pass 2")
	return message, err
}

// GetMessages is the resolver for the getMessages field.
func (r *queryResolver) GetMessages(ctx context.Context, roomID string) ([]*model.Message, error) {
	return service.GetMessages(ctx, roomID)
}

// GetUsers is the resolver for the getUsers field.
func (r *queryResolver) GetUsers(ctx context.Context, roomID string) ([]*model.User, error) {
	return service.GetUsers(ctx, roomID)
}

// MessageCreated is the resolver for the messageCreated field.
func (r *subscriptionResolver) MessageCreated(ctx context.Context, userID string, roomID string) (<-chan []*model.Message, error) {
	if r.messageChannel == nil {
		r.messageChannel = make(map[string]map[string]chan []*model.Message)
	}
	if r.messageChannel[roomID] == nil {
		r.messageChannel[roomID] = make(map[string]chan []*model.Message)
	}
	if r.messageChannel[roomID][userID] == nil {
		r.messageChannel[roomID][userID] = make(chan []*model.Message)
	}

	var messages []*model.Message
	if err := r.DB.Find(&messages, "room_id = ?", roomID).Error; err != nil {
		close(r.messageChannel[roomID][userID])
	}
	go func() {
		r.messageChannel[roomID][userID] <- messages
		for {
			select {
			case <-ctx.Done():
				fmt.Println("Close")
				delete(r.messageChannel[roomID], userID)
				return
			}
		}
	}()

	return r.messageChannel[roomID][userID], nil
}

// Message returns graph.MessageResolver implementation.
func (r *Resolver) Message() graph.MessageResolver { return &messageResolver{r} }

// Subscription returns graph.SubscriptionResolver implementation.
func (r *Resolver) Subscription() graph.SubscriptionResolver { return &subscriptionResolver{r} }

type messageResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
