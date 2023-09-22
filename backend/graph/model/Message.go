package model

import "time"

type Message struct {
	ID        string    `json:"id"`
	Message   string    `json:"message"`
	Type      string    `json:"type"`
	RoomID    string    `json:"roomId"`
	Room      *Room     `json:"room" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	CreatedAt time.Time `json:"createdAt"`
	UserID    string    `json:"userId"`
	User      *User     `json:"user" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
}
