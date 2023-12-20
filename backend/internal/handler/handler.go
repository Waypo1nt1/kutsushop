package handler

import (
	"encoding/json"
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

func (h *Handler) GetAllSellers(w http.ResponseWriter, r *http.Request) {
	data, _, _ := h.client.From("sellers").Select("*", "", false).Execute()

	w.Write(data)
}

func (h *Handler) GetAllShoes(w http.ResponseWriter, r *http.Request) {
	data, _, _ := h.client.From("shoes").Select("*", "", false).Execute()

	w.Write(data)
}

func (h *Handler) CreatShoesSales(w http.ResponseWriter, r *http.Request) {

	type Payload struct {
		ShoesId  int `json:"shoes_id"`
		Price    int `json:"price"`
		Quantity int `json:"quantity"`
		SellerID int `json:"seller_id"`
	}

	var p Payload

	json.NewDecoder(r.Body).Decode(&p)

	data_to_insert := map[string]any{
		"shoes_id":          p.ShoesId,
		"proceed":           p.Price,
		"shoes_sale_amount": p.Quantity,
		"seller_id":         p.SellerID,
	}

	h.client.From("sale_of_shoes").Insert(data_to_insert, false, "", "", "").Execute()

	w.WriteHeader(http.StatusCreated)
}
