package model

import "time"

type Notification struct {
	ID         string    `json:"id"`
	SenderID   string    `json:"sender_id"`
	ReceiverID string    `json:"receiver_id"`
	Message    string    `json:"message"`
	Content    string    `json:"content"`
	Type       string    `json:"type"`
	CreatedAt  time.Time `json:"created_at"`
	Status     bool      `json:"status"`
	Sender     User      `json:"sender" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	Receiver   User      `json:"receiver" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
}
