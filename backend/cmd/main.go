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

	DATA_API_URL := "https://jiugfvhwjrmchiomueyo.supabase.co"
	DATA_API_KEY := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdWdmdmh3anJtY2hpb211ZXlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgyODkwMSwiZXhwIjoyMDE4NDA0OTAxfQ.GGl3sVS9RBqTMwOPjWbE8w_NOMW9y715vrbGYarHs8c"

	USERS_API_URL := "https://ldunnasxsgyuiskqckmn.supabase.co"
	USERS_API_KEY := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdW5uYXN4c2d5dWlza3Fja21uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzE2MDIwMSwiZXhwIjoyMDE4NzM2MjAxfQ.nBmkoUW8EZvH-On6rfzGiBz_08hkhwuGhtzRl8TwK8Q"

	h_data := handler.New(DATA_API_URL, DATA_API_KEY)
	h_users := handler.New(USERS_API_URL, USERS_API_KEY)

	r.Get("/data", h_data.GetAllData)
	r.Get("/sellers", h_data.GetAllSellers)
	r.Get("/shoes", h_data.GetAllShoes)

	r.Post("/shoes_sales", h_data.CreateShoesSales)
	r.Post("/create_sellers", h_data.CreateSellers)

	r.Get("/users", h_users.GetAllData)
	r.Post("/create_users", h_users.CreateUsers)

	r.Get("/excel", h_data.GetExcelFile)

	r.Post("/update_users", h_users.UpdateUsers)
	r.Post("/update_sellers", h_data.UpdateSellers)

	r.Post("/position", h_users.GetPosition)


	http.ListenAndServe(":3000", r)
}
