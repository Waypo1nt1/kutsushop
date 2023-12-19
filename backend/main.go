package main

import (
	"fmt"
	"net/http"
	//"encoding/json"
	"github.com/go-chi/cors"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/supabase-community/supabase-go"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"http://localhost:3000"}, // Use this to allow specific origin hosts
		AllowedOrigins:   []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	  }))
	r.Get("/data", getData)
	http.ListenAndServe(":3000", r)
}

type Sale_of_shoes struct {
	Key               int32 `json:"id" datastore:"-"`
	Shoes_sale_amount int32 `json:"amount"`
}

func getData(w http.ResponseWriter, r *http.Request) {
	API_URL := "https://jiugfvhwjrmchiomueyo.supabase.co"
	API_KEY := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdWdmdmh3anJtY2hpb211ZXlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgyODkwMSwiZXhwIjoyMDE4NDA0OTAxfQ.GGl3sVS9RBqTMwOPjWbE8w_NOMW9y715vrbGYarHs8c"
	client, err := supabase.NewClient(API_URL, API_KEY, nil)
	if err != nil {
		fmt.Println("cannot initalize client", err)
	}
	data, count, err := client.From("shoes").Select("*", "exact", false).Execute()
	if err != nil {
		println("error with db", err)
	}
	fmt.Println(count)
	/*fmt.Println(count)
	//data_json, err := json.Marshal(data)
	//fmt.Println(string(data_json))
	type shoes struct {
		shoes_name string
	}
	var data_json_unmarshal []shoes
	err = json.Unmarshal(data, &data_json_unmarshal)
	if err != nil {
		fmt.Println("unmarshal error: ", err)
	}
	println(data_json_unmarshal)
	*/
	w.Write(data)
}
