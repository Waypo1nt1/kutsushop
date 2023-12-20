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
      <div className={`${shoes.length ? "opacity-100 viisble" : "opacity-0 invisible"} transition-opacity duration-500`}>
      <article className="grid grid-cols-5  px-10 py-5 text-white text-center">
            <div className="underline text-xl">Id поставки</div>
            <div className="underline text-xl">Id обуви</div>
            <div className="underline text-xl">Количество</div>
            <div className="underline text-xl">Id поставщика</div>
            <div className="underline text-xl">Сумма поставки</div>
          </article>
        {shoes.map((shoe) => (
          <article key={shoe.shoes_id} className={`grid grid-cols-5 bg-[#333333] px-10 py-5 border mb-3 text-center`}>
            <div >{shoe.supply_id}</div>
            <div >{shoe.shoes_id}</div>
            <div>{shoe.shoes_supply_amount}</div>
            <div >{shoe.supplier_id}</div>
            <div >{shoe.supply_price}</div>
          </article>
      ))}
    </div>
    </PageWrapper>
  )
}

export default Orders
