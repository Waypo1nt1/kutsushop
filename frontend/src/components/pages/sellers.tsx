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
  
  const button = window.sessionStorage.getItem('is_admin') === 'true' ? (<a target="_blank" href="http://localhost:5173/adminform"><button className="w-8 h-8 bg-blue-500 items-center justify-center rounded-full border border-white">
                    <svg className="mx-auto my-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12H20M12 4V20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button></a>) : ''
                  
  return (
    <PageWrapper header="Продавцы" button={button}>
      {window.sessionStorage.getItem('is_admin') === 'true' ? 
      <div className={`${shoes.length ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity duration-500`}>
      <article className="grid grid-cols-5  px-10 py-5 text-white text-center">
            <div className="underline text-xl">Id продавца</div>
            <div className="underline text-xl">Имя</div>
            <div className="underline text-xl">Фамилия</div>
            <div className="underline text-xl">Отчество</div>
            <div className="underline text-xl">Номер телефона</div>
          </article>
        {shoes.map((shoe) => (
          <article key={shoe.id} className={`grid grid-cols-5 bg-[#333333] px-10 py-5 border mb-3 text-center`}>
            <div >{shoe.id}</div>
            <div >{shoe.name}</div>
            <div>{shoe.surname}</div>
            <div >{shoe.middle_name}</div>
            <div >{shoe.phone_number}</div>
          </article>
      ))}
      </div> : <article className="px-10 py-5 text-white">
             <div className=" text-xl">У вас нет доступа к этим данным: необходим аккаунт администратора</div>
             </article>}
    </PageWrapper>
  )
}

export default Orders
