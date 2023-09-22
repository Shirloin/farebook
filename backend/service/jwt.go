package service

import (
	"context"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/shirloin/backend/graph/model"
	"github.com/shirloin/backend/helper"
)

var secret_key = []byte(helper.GoDotEnvVariable("SECRET_KEY"))
var revokedTokens = make(map[string]bool)

func JwtValidate(ctx context.Context, token string) (*jwt.Token, error) {

	if _, ok := revokedTokens[token]; ok {
		return nil, fmt.Errorf("Token is revoked")
	}

	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("There is a problem with the signing method")
		}
		return secret_key, nil
	})
}

func JwtGenerateToken(u *model.User) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": expirationTime.Unix(),
		"id":  u.ID,
	})
	keyBytes := secret_key
	tokenString, err := token.SignedString(keyBytes)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func JwtTokenFromContext(ctx context.Context) (string, error) {
	user, ok := ctx.Value("TokenValue").(*model.User)
	token := user.ID
	if !ok {
		return "", jwt.ErrInvalidKey
	}
	return token, nil
}
