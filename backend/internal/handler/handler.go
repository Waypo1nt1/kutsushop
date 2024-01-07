package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/supabase-community/supabase-go"
	"github.com/xuri/excelize/v2"
	"github.com/kutsushop/internal/pipes"
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

	//fmt.Println(string(data[:]))
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

func (h *Handler) CreateShoesSales(w http.ResponseWriter, r *http.Request) {

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
		"proceed":           p.Price * p.Quantity,
		"shoes_sale_amount": p.Quantity,
		"seller_id":         p.SellerID,
	}

	h.client.From("sale_of_shoes").Insert(data_to_insert, false, "", "", "").Execute()

	w.WriteHeader(http.StatusCreated)
}

func (h *Handler) CreateSellers(w http.ResponseWriter, r *http.Request) {
	type Payload struct {
		Surname string `json:"surname"`
		Name string `json:"name"`
		MiddleName string `json:"middle_name"`
		PhoneNumber string `json:"phone_number"`
	}
	var p Payload

	json.NewDecoder(r.Body).Decode(&p)

	data_to_insert := map[string]any{
		"surname": p.Surname,
		"name": p.Name,
		"middle_name": p.MiddleName,
		"phone_number": p.PhoneNumber,
	}

	h.client.From("sellers").Insert(data_to_insert, false, "", "", "").Execute()

	w.WriteHeader(http.StatusCreated)
}

func (h *Handler) CreateUsers(w http.ResponseWriter, r *http.Request) {
	type Payload struct {
		id int `json:"id"`
		Email string `json:"email"`
		Password string `json:"password"`
	}
	var p Payload

	json.NewDecoder(r.Body).Decode(&p)

	data_to_insert := map[string]any{
		"id": p.id,
		"email": p.Email,
		"password": p.Password,
		"is_admin": false,
	}

	h.client.From("users").Insert(data_to_insert, false, "", "", "").Execute()

	w.WriteHeader(http.StatusCreated)
}

func (h *Handler) GetExcelFile(w http.ResponseWriter, r *http.Request) {

	data, _, _ := h.client.From("sale_of_shoes").Select("*", "", false).Execute()
	
	var excel_data []map[string]any
	pipes.FromJson(data, &excel_data)

	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println(err)
		}
	}()
	
	index, err := f.NewSheet("заказы")
	if err != nil {
		fmt.Println(err)
		return
	}
	f.SetCellValue("Заказы", "A1", "ID заказа")
	f.SetCellValue("Заказы", "B1", "ID модели обуви")
	f.SetCellValue("Заказы", "C1", "Общая сумма")
	f.SetCellValue("Заказы", "D1", "ID продавца")
	f.SetCellValue("Заказы", "E1", "Количество")

	for i, item := range excel_data {
		f.SetCellValue("Заказы", fmt.Sprintf("A%d", i+2), item["id"])
		f.SetCellValue("Заказы", fmt.Sprintf("B%d", i+2), item["shoes_id"])
		f.SetCellValue("Заказы", fmt.Sprintf("C%d", i+2), item["proceed"])
		f.SetCellValue("Заказы", fmt.Sprintf("D%d", i+2), item["seller_id"])
		f.SetCellValue("Заказы", fmt.Sprintf("E%d", i+2), item["shoes_sale_amount"])
	}

	f.SetActiveSheet(index)

	filePath := "./заказы.xlsx"

	if err := f.SaveAs("заказы.xlsx"); err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Disposition", "attachment; filename="+strconv.Quote("заказы.xlsx"))
	w.Header().Set("Content-Type", r.Header.Get("Content-Type"))
	http.ServeFile(w, r, filePath)

	w.WriteHeader(http.StatusOK)
}