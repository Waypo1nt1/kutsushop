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
	tableParam := r.URL.Query().Get("table")
	fmt.Println(tableParam)

	data, _, _ := h.client.From(tableParam).Select("*", "exact", false).Execute()

	w.Write(data)
}
