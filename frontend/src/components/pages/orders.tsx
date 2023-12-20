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
        <>
        <div key={shoe.id}>{shoe.shoes_id}</div>
        <div key={shoe.id}>{shoe.shoes_sale_amount}</div>
        <div key={shoe.id}>{shoe.proceed}</div>
        <div key={shoe.id}>{shoe.seller_id}</div>
        </>
      ))}
    </PageWrapper>
  )
}

export default Orders
