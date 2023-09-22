package model

type File struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Type   string `json:"type"`
	PostID string `json:"postId"`
	Post   *Post  `json:"post" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
}
