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
      <div className={`${shoes.length ? "opacity-100 viisble" : "opacity-0 invisible"} transition-opacity duration-500`}>
      <article className="grid grid-cols-5  px-10 py-5 text-white text-center">
            <div className="underline text-xl">Id</div>
            <div className="underline text-xl">Id модели обуви</div>
            <div className="underline text-xl">Общая сумма</div>
            <div className="underline text-xl">Id продавца</div>
            <div className="underline text-xl">Количество</div>
          </article>
        {shoes.map((shoe) => (
          <article key={shoe.id} className={`grid grid-cols-5 bg-[#333333] px-10 py-5 border mb-3 text-center`}>
            <div >{shoe.id}</div>
            <div>{shoe.shoes_id}</div>
            <div >{shoe.proceed}</div>
            <div >{shoe.seller_id}</div>
            <div >{shoe.shoes_sale_amount}</div>
          </article>
      ))}
    </div>
    </PageWrapper>
  )
}

export default Orders
