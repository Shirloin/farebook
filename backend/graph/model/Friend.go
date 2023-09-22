package model

type Friend struct {
	User_OneID string `json:"user_oneID" gorm:"primaryKey"`
	User_TwoID string `json:"user_twoID" gorm:"primaryKey"`
	Status     bool   `json:"status"`
}
