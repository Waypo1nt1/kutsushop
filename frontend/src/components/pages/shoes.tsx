import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
  shoes_name: string
}

const Orders = () => {
  const [shoes, setShoes] = useState<Shoes[]>([])


    useEffect(() => {
        const url = "http://localhost:3000/data?table=shoes"
        axios.get(url).then((response) => {
          setShoes(response.data)
        })
      }, [])


  return (
    <PageWrapper header="Модели обуви">
      {shoes.map((shoe) => (
        <div key={shoe.id} className="flex justify-between">
        <div className="bg-slate-800">
          id пары обуви
          <div className="bg-gray-900">
            {shoe.id}
          </div>
        </div>
        <div className="bg-slate-800">
          Экземпляр
          <div className="bg-gray-900">
            {shoe.shoes_name}
          </div>
        </div>
        </div>
      ))}
    </PageWrapper>
  )
}

export default Orders
