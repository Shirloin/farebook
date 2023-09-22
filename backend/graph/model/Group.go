package model

import "time"

type Group struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Privacy   string    `json:"privacy"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"createdAt"`
	Members   []Member  `json:"members" gorm:"foreignKey:GroupID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Posts     []Post    `json:"posts" gorm:"foreignKey:GroupID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
