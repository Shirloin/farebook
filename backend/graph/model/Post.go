package model

import "time"

type Post struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	File      []File    `json:"file"  gorm:"foreignKey:PostID; constraint:OnDelete:CASCADE"`
	UserID    string    `json:"userId"`
	User      *User     `json:"user" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	CreatedAt time.Time `json:"createdAt"`
	Comment   []Comment `json:"comment" gorm:"foreignKey:PostID; constraint:OnDelete:CASCADE"`
	Privacy   string    `json:"privacy"`
	GroupID   *string   `json:"groupId"`
	Group     *Group    `json:"group" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
}
