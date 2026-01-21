package main

import (
	"log"
	"net/http"

	"monorepo/config"
	"monorepo/handlers"
	"monorepo/middleware"

	"github.com/gorilla/mux"
)

func main() {
	db, err := config.ConnectMongo()
	if err != nil {
		log.Fatal(err)
	}

	userHandler := &handlers.UserHandler{
		Collection: db.Collection("users"),
	}

	// Auth Handler
	authHandler := &handlers.AuthHandler{
		Collection: db.Collection("users"),
	}

	r := mux.NewRouter()

	r.HandleFunc("/login", authHandler.Login).Methods("POST")
	r.HandleFunc("/register", authHandler.Register).Methods("POST")

	api := r.PathPrefix("/").Subrouter()
	api.Use(middleware.JWTAuth)

	api.HandleFunc("/users", userHandler.GetAll).Methods("GET")
	api.HandleFunc("/users", userHandler.Create).Methods("POST")
	api.HandleFunc("/users/{id}", userHandler.Update).Methods("PUT")
	// CORS Middleware
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	// r.Use(corsHandler) <--- Removed

	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler(r)))
}
