package model

type GroupRoom struct {
	ID      string `json:"id"`
	GroupID string `json:"groupId"`
	Group   *Group `json:"group" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
}
