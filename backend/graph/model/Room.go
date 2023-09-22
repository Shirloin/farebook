package model

type Room struct {
	ID          string `json:"id"`
	User_One_ID string `json:"user_one_id" gorm:"foreignKey:User_One_ID"`
	User_Two_ID string `json:"user_two_id" gorm:"foreignKey:User_Two_ID"`
	User_One    *User  `json:"user_one" gorm:"foreignKey:User_One_ID"`
	User_Two    *User  `json:"user_two" gorm:"foreignKey:User_Two_ID"`
}
