import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
  shoes_id: number
  shoes_sale_amount: number
  proceed: number
  seller_id: number
}

const Orders = () => {
  const [shoes, setShoes] = useState<Shoes[]>([])

    useEffect(() => {
        const url = "http://localhost:3000/data?table=sale_of_shoes"
        axios.get(url).then((response) => {
          setShoes(response.data)
        })
      }, [])


  return (
    <PageWrapper header="Заказы">
      {shoes.map((shoe) => (
        <div key={shoe.id} className="flex justify-between">
        <div className="bg-slate-800">
          id выбитого чека
          <div className="bg-gray-900">
            {shoe.id}
          </div>
        </div>
        <div className="bg-slate-800">
          id пары обуви
          <div className="bg-gray-900">
            {shoe.shoes_id}
          </div>
        </div>
        <div className="bg-slate-800">
          Количество продаваемых пар
        <div className="bg-gray-900">
          {shoe.shoes_sale_amount}
        </div>
        </div>
        <div className="bg-slate-800">
          Доход
        <div className="bg-gray-900">
          {shoe.proceed}
          </div>
        </div>
        <div className="bg-slate-800">
          id продавца
        <div className="bg-gray-900">{shoe.seller_id}</div>
        </div>
        </div>
      ))}
    </PageWrapper>
  )
}

export default Orders
