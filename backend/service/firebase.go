package service

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"github.com/99designs/gqlgen/graphql"
	"github.com/google/uuid"
	"github.com/shirloin/backend/helper"

	"google.golang.org/api/option"
)

func GetFirestoreClient() (*firestore.Client, error) {
	opt := option.WithCredentialsFile("path/to/serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}
	fmt.Println("Pass 1")

	ctx := context.Background()

	client, err := app.Firestore(ctx)
	if err != nil {
		return nil, fmt.Errorf("error initializing Firestore client: %v", err)
	}
	fmt.Println("Pass 2")
	return client, nil
}

func GetStorageClient() (*storage.Client, error) {
	opt := option.WithCredentialsFile("./secrets/tpa-web-f46c8-firebase-adminsdk-a9drq-bacb4b96b0.json")
	ctx := context.Background()
	storage, err := storage.NewClient(ctx, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing storage: %v", err)
	}
	return storage, nil
}

func UploadFile(upload *graphql.Upload) (string, error) {
	storageClient, err := GetStorageClient()
	if err != nil {
		return "", fmt.Errorf("error initializing storage client: %v", err)
	}
	defer storageClient.Close()
	bucketName := helper.GoDotEnvVariable("BUCKET_NAME")
	bucket := storageClient.Bucket(bucketName)
	uuid := uuid.NewString()
	filename := "https://storage.cloud.google.com/" + bucketName + "/" + uuid
	obj := bucket.Object(uuid)
	objWriter := obj.NewWriter(context.Background())
	_, err = io.Copy(objWriter, upload.File)
	if err != nil {
		return "", fmt.Errorf("error copying file to Firebase Storage: %v", err)
	}
	objWriter.Close()
	return filename, nil
}
