package model

import "time"

type Member struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	User      *User     `json:"user" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	Role      string    `json:"role"`
	JoinedAt  time.Time `json:"joinedAt"`
	GroupID   string    `json:"groupId"`
	Group     *Group    `json:"group" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Confirmed bool      `json:"confirmed"`
}
