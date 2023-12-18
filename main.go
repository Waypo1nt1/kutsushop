package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	supa "github.com/nedpals/supabase-go"
)

func main() {
	API_URL := "https://jiugfvhwjrmchiomueyo.supabase.co"
	API_KEY := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdWdmdmh3anJtY2hpb211ZXlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgyODkwMSwiZXhwIjoyMDE4NDA0OTAxfQ.GGl3sVS9RBqTMwOPjWbE8w_NOMW9y715vrbGYarHs8c"
	supabase := supa.CreateClient(API_URL, API_KEY)

	var results map[string]interface{}
	err := supabase.DB.From("shoes").Select("*").Single().Execute(&results)
	if err != nil {
		println("error with db", err)
	  }
	fmt.Println(results)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ddd"))
	})
	http.ListenAndServe(":3000", r)
}
