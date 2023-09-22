package helper

import (
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func GoDotEnvVariable(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error Loading .env file")
	}
	return os.Getenv(key)
}

func EncryptPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

func ComparePassword(hashedPassword, plainPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}

func DateConverter(date string) (time.Time, error) {
	layout := "2006-01-02"
	dob, err := time.Parse(layout, date)
	return dob, err
}

func FileType(filename string) string {
	extension := filepath.Ext(filename)
	image := []string{".jpg", ".png", ".jpeg"}
	for _, ext := range image {
		if extension == ext {
			return "image"
		}
	}
	if extension == ".mp4" {
		return "video"
	}
	if extension == ".mp3" {
		return "audio"
	}
	return ""
}
