package main

import (
	"net/http"

	//"encoding/json"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/kutsushop/internal/handler"
)

func main() {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"*"},
	}))

	API_URL := "https://jiugfvhwjrmchiomueyo.supabase.co"
	API_KEY := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdWdmdmh3anJtY2hpb211ZXlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgyODkwMSwiZXhwIjoyMDE4NDA0OTAxfQ.GGl3sVS9RBqTMwOPjWbE8w_NOMW9y715vrbGYarHs8c"

	h := handler.New(API_URL, API_KEY)

	r.Get("/data", h.GetAllData)

	http.ListenAndServe(":3000", r)
}
