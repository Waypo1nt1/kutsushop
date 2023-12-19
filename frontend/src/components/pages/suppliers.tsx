import { useEffect, useState } from "react"
import PageWrapper from "../page-wrapper"
import axios from "axios"

interface Shoes {
  id: number
  shoes_name: string
}

const Orders = () => {
  const [govno, setGovno] = useState<Shoes[]>([])


  // TODO
  useEffect(() => {
      const url = "http://localhost:3000/data"
      axios.get(url).then((response) => {
        setGovno(response.data)
      })
  }, [])


  return (
    <PageWrapper header="Поставщики">
      {govno.map((pid$r) => (
        <div key={pid$r.id}>{pid$r.shoes_name}</div>
      ))}
    </PageWrapper>
  )
}

export default Orders
