package model

import "time"

type User struct {
	ID                    string         `json:"id"`
	Firstname             string         `json:"firstname"`
	Lastname              string         `json:"lastname"`
	Email                 string         `json:"email" gorm:"unique"`
	Password              string         `json:"password"`
	Dob                   time.Time      `json:"dob"`
	Gender                string         `json:"gender"`
	Image                 string         `json:"image"`
	IsVerified            bool           `json:"isverified"`
	Posts                 []Post         `json:"posts" gorm:"foreignKey:UserID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Comments              []Comment      `json:"comments" gorm:"foreignKey:UserID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	FriendsOne            []Friend       `json:"friendsone" gorm:"foreignKey:User_OneID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	FriendsTwo            []Friend       `json:"friendstwo" gorm:"foreignKey:User_TwoID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Stories               []Story        `json:"stories" gorm:"foreignKey:UserID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	SentNotifications     []Notification `gorm:"foreignKey:SenderID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ReceivedNotifications []Notification `gorm:"foreignKey:ReceiverID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
