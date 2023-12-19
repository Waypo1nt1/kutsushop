import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
  shoes_name: string
}

const Orders = () => {
  const [shoes, setShoes] = useState<Shoes[]>([])


  // TODO
  useEffect(() => {
      const url = "http://localhost:3000/data?table=supplies"
      axios.get(url).then((response) => {
        setShoes(response.data)
      })
  }, [])


  return (
    <PageWrapper header="Поставки">
      {shoes.map((shoe) => (
        <div key={shoe.id}>{shoe.shoes_name}</div>
      ))}
    </PageWrapper>
  )
}

export default Orders
