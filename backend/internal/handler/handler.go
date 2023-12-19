package handler

import (
	"fmt"
	"net/http"

	"github.com/supabase-community/supabase-go"
)

type Handler struct {
	client *supabase.Client
}

func New(api_url, api_key string) *Handler {
	client, err := supabase.NewClient(api_url, api_key, nil)
	if err != nil {
		fmt.Println("cannot initalize client", err)
	}

	return &Handler{
		client,
	}
}

func (h *Handler) GetAllData(w http.ResponseWriter, r *http.Request) {
	data, _, _ := h.client.From("shoes").Select("*", "exact", false).Execute()

	w.Write(data)
}
