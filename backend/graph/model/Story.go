package model

import "time"

type Story struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	UserID    string    `json:"userId"`
	User      *User     `json:"user" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	CreatedAt time.Time `json:"createdAt"`
	Privacy   string    `json:"privacy"`
}
