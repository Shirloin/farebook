package model

type Comment struct {
	ID       string    `json:"id"`
	Text     string    `json:"text"`
	UserID   string    `json:"userId"`
	User     *User     `json:"user" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	PostID   string    `json:"postId,omitempty"`
	Post     *Post     `json:"post" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	ParentID *string   `json:"parentId,omitempty"`
	Parent   *Comment  `json:"parent" gorm:"OnUpdate:CASCADE, OnDelete:CASCADE"`
	Replies  []Comment `json:"replies" gorm:"foreignKey:ParentID; OnUpdate:CASCADE, OnDelete:CASCADE"`
}
