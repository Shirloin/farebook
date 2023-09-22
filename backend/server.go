package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/shirloin/backend/database"
	"github.com/shirloin/backend/directives"
	"github.com/shirloin/backend/graph"
	"github.com/shirloin/backend/graph/resolver"
	"github.com/shirloin/backend/helper"
	"github.com/shirloin/backend/middleware"
)

const defaultPort = "8080"

func main() {
	port := helper.GoDotEnvVariable("PORT")
	if port == "" {
		port = defaultPort
	}
	database.MigrateTable()
	c := graph.Config{Resolvers: &resolver.Resolver{
		DB: database.GetInstance(),
	}}
	c.Directives.Auth = directives.Auth

	router := mux.NewRouter()
	router.Use(middleware.CorsMiddleware)
	router.Use(middleware.Auth)
	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		})
	})

	srv := handler.New(graph.NewExecutableSchema(c))

	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	srv.AddTransport(&transport.GET{})
	srv.AddTransport(&transport.Options{})
	srv.AddTransport(&transport.POST{})
	srv.AddTransport(&transport.MultipartForm{})
	srv.Use(extension.Introspection{})

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
