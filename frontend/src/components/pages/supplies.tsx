import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  supply_id: number
  shoes_id: number
  supplier_id: number
  shoes_supply_amount: number
  supply_price: number
  supply_manager_id: number
}

const Orders = () => {
  const [shoes, setShoes] = useState<Shoes[]>([])


  useEffect(() => {
      const url = "http://localhost:3000/data?table=supply_of_shoes"
      axios.get(url).then((response) => {
        console.log(response.data)
        setShoes(response.data)
      })
  }, [])


  return (
    <PageWrapper header="Поставки">
      {shoes.map((shoe) => (
        <div key={shoe.supply_id} className="flex justify-between">
        <div className="bg-slate-800">
          id поставки
          <div className="bg-gray-900">
            {shoe.supply_id}
          </div>
        </div>
        <div className="bg-slate-800">
          id пары обуви
          <div className="bg-gray-900">
            {shoe.shoes_id}
          </div>
        </div>
        <div className="bg-slate-800">
          id поставщика
        <div className="bg-gray-900">
          {shoe.supplier_id}
        </div>
        </div>
        <div className="bg-slate-800">
          Количество поставляемых пар
        <div className="bg-gray-900">
          {shoe.shoes_supply_amount}
          </div>
        </div>
        <div className="bg-slate-800">
          Цена поставки
        <div className="bg-gray-900">{shoe.supply_price}</div>
        </div>
        <div className="bg-slate-800">
          id менеджера поставки
        <div className="bg-gray-900">{shoe.supply_manager_id}</div>
        </div>
        </div>
      ))}
    </PageWrapper>
  )
}

export default Orders
