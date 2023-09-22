package model

import "time"

type GroupChat struct {
	ID          string     `json:"id"`
	Message     string     `json:"message"`
	Type        string     `json:"type"`
	GroupRoomID string     `json:"groupRoomId"`
	GroupRoom   *GroupRoom `json:"room" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	UserID      string     `json:"userId"`
	User        *User      `json:"user" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	CreatedAt   time.Time  `json:"createdAt"`
}
