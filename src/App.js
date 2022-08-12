import './index.css'
import { useState, useEffect, useCallback } from 'react'
import { GiFilmSpool } from 'react-icons/gi'
import Search from './componentes/buscar'
import Addfilms from './componentes/Addfilms'
import AppointmentInfo from './componentes/Appointmentinfo'

function App() {
  let [appointmentList, setAppointmentList] = useState([])
  let [query, setQuery] = useState('')
  let [sortBy, setSortBy] = useState('petName')
  let [orderBy, setOrderBy] = useState('asc')

  const filterAppointments = appointmentList
    .filter(item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    })
    .sort((a, b) => {
      let order = orderBy === 'asc' ? 1 : -1
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order
    })

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="App container mx-auto mt-5 font-thin">
      <h1 className="text-5xl text-blue-700 mb-3">
        FilmsG
        <GiFilmSpool className="inline-block text-blue-500" />
      </h1>
      <Addfilms
        onSendAppointment={myAppointment =>
          setAppointmentList([...appointmentList, myAppointment])
        }
        lastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        query={query}
        onQueryChange={myQuery => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={mySort => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)}
      />

      <ul className="divide-y divide-gray-200">
        {filterAppointments.map(appointment => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={appointmentId =>
              setAppointmentList(
                appointmentList.filter(
                  appointment => appointment.id !== appointmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default App
