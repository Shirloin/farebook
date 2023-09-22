//go:generate go run github.com/99designs/gqlgen generate
package resolver

import (
	"github.com/shirloin/backend/graph/model"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB             *gorm.DB
	messageChannel map[string]map[string]chan []*model.Message
	chatChannel    map[string]map[string]chan []*model.GroupChat
}
