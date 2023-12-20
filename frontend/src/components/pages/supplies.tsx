import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
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
        <>
        <div key={shoe.id}>{shoe.shoes_id}</div>
        <div key={shoe.id}>{shoe.supplier_id}</div>
        <div key={shoe.id}>{shoe.shoes_supply_amount}</div>
        <div key={shoe.id}>{shoe.supply_price}</div>
        <div key={shoe.id}>{shoe.supply_manager_id}</div>
        </>
      ))}
    </PageWrapper>
  )
}

export default Orders
