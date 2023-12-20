import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
  company: string
}

const Orders = () => {
  const [shoes, setShoes] = useState<Shoes[]>([])


  
  useEffect(() => {
      const url = "http://localhost:3000/data?table=suppliers"
      axios.get(url).then((response) => {
        setShoes(response.data)
      })
  }, [])


  return (
    <PageWrapper header="Поставщики">
      {shoes.map((shoe) => (
        <div key={shoe.id} className="flex justify-between">
        <div className="bg-slate-800">
          id поставщика
          <div className="bg-gray-900">
            {shoe.id}
          </div>
        </div>
        <div className="bg-slate-800">
          Фирма
          <div className="bg-gray-900">
            {shoe.company}
          </div>
        </div>
        </div>
      ))}
    </PageWrapper>
  )
}

export default Orders
