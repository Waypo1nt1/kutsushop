import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
  surname: string
  name: string
  middle_name: string
  phone_number: string
}

const Orders = () => {
  const [shoes, setShoes] = useState<Shoes[]>([])


  useEffect(() => {
      const url = "http://localhost:3000/data?table=sellers"
      axios.get(url).then((response) => {
        setShoes(response.data)
      })
  }, [])


  return (
    <PageWrapper header="Продавцы">
      {shoes.map((shoe) => (
        <div key={shoe.id} className="flex justify-between">
        <div className="bg-slate-800">
          id продавца
          <div className="bg-gray-900">
            {shoe.id}
          </div>
        </div>
        <div className="bg-slate-800">
          Фамилия
          <div className="bg-gray-900">
            {shoe.surname}
          </div>
        </div>
        <div className="bg-slate-800">
          Имя
        <div className="bg-gray-900">
          {shoe.name}
        </div>
        </div>
        <div className="bg-slate-800">
          Отчество
        <div className="bg-gray-900">
          {shoe.middle_name}
          </div>
        </div>
        <div className="bg-slate-800">
          Номер телефона
        <div className="bg-gray-900">
          {shoe.phone_number}
          </div>
        </div>
        </div>
      ))}
    </PageWrapper>
  )
}

export default Orders
