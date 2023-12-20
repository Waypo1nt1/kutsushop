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
        <>
        <div key={shoe.id}>{shoe.company}</div>
        </>
      ))}
    </PageWrapper>
  )
}

export default Orders
