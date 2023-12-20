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
        <div key={shoe.id}>{shoe.shoes_name}</div>
      ))}
    </PageWrapper>
  )
}

export default Orders
