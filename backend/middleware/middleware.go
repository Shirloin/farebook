package middleware

import (
	"context"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/rs/cors"
	"github.com/shirloin/backend/service"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		header := r.Header.Get("Authorization")

		if header == "" {
			next.ServeHTTP(w, r)
			return
		}

		tokenStr := header
		token, err := service.JwtValidate(r.Context(), tokenStr)

		if err != nil {
			http.Error(w, "Invalid Token", http.StatusForbidden)
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		ID := claims["id"].(string)
		user, err := service.GetUser(r.Context(), ID)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}
		ctx := context.WithValue(r.Context(), "TokenValue", user)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func CorsMiddleware(next http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
		Debug:            true,
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	})
	return c.Handler(next)
}
