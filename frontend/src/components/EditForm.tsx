import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  


export default function EditForm() {
    let query = useQuery()
    console.log(query.get("id"))
    console.log(query.get("middlename"))

    const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const target = event.target as EventTarget & Record<'surname' | 'name' | 'middlename' | 'phone_number' | 'email' | 'password', { value: string }>

    axios
      .post('http://localhost:3000/create_sellers', {
        id: Number(query.get("id")),
        surname: String(target.surname.value),
        name: String(target.name.value),
        middle_name: String(target.middlename.value),
        phone_number: String(target.phone_number.value),
      })
      .then(() => {
        console.log('sellers post success')
      })

    axios
      .post('http://localhost:3000/create_users', {
        id: Number(query.get("uid")),
        position: String(query.get("position")),
      })
      .then(() => {
        console.log('users post success')
      })
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300 min-h-full">
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-900 shadow p-6 border-b h-screen flex justify-center items-center">
          <div className="w-full">
            <h1 className="text-center text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Редактирование продавца с id {query.get("id")}</h1>
            <p className="text-center text-white mb-6">Укажите информацию о продавце</p>
            <form onSubmit={onSubmit} className="w-1/2 mx-auto">
              <div className="flex w-full justify-between">
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Фамилия</label>
                  <input name="surname" defaultValue={query.get("surname")} className="shadow appearance-none border rounded w-full py-2 px-3"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Имя</label>
                  <input name="name" defaultValue={query.get("name")} placeholder="Введите имя" className="shadow appearance-none border rounded w-full py-2 px-3"></input>
                </div>
              </div>
              <div className="mb-8 flex flex-col items-center">
                <label className="block text-sm font-bold mb-2">Отчество</label>
                <input name="middlename" defaultValue={query.get("middlename")} placeholder="Введите отчество" className="shadow appearance-none border rounded w-1/2 py-2 px-3"></input>
              </div>
              <div className="mb-10 flex flex-col items-center">
                <label className="block text-sm font-bold mb-2">Номер телефона</label>
                <input
                  name="phone_number"
                  defaultValue={query.get("phone_number")}
                  placeholder="Введите номер телефона"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3"></input>
              </div>
              <div className="mb-10 flex flex-col items-center">
                <label className="block text-sm font-bold mb-2">Должность</label>
                <input
                  name="position"
                  defaultValue={query.get("position")}
                  placeholder="Введите должность"
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3"></input>
              </div>
              <button type="submit" className="btn btn-neutral mt-5">
                {' '}
                Добавить{' '}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
