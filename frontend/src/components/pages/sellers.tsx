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
        <>
          <div key={shoe.id}>{shoe.surname}</div>
          <div key={shoe.id}>{shoe.name}</div>
          <div key={shoe.id}>{shoe.middle_name}</div>
          <div key={shoe.id}>{shoe.phone_number}</div>
        </>
      ))}
    </PageWrapper>
  )
}

export default Orders
