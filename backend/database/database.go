package database

import (
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/helper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var database *gorm.DB

const defaultDatabase = "host=localhost user=postgres password=postgres dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai"

func GetInstance() *gorm.DB {
	if database == nil {
		dsn := helper.GoDotEnvVariable("DATABASE_URL")
		if dsn == "" {
			dsn = defaultDatabase
		}
		db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic(err)
		}
		database = db
	}
	return database
}

func MigrateTable() {
	db := GetInstance()
	db.AutoMigrate(&model.User{}, &model.Friend{}, &model.Room{}, &model.Message{}, &model.Post{}, &model.Comment{}, &model.File{}, &model.Story{}, &model.Notification{}, &model.Member{}, &model.Group{}, &model.GroupRoom{}, &model.GroupChat{})
}
