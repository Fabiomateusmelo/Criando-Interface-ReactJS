import './index.css'
import { useState, useEffect, useCallback } from 'react'
import { GiFilmSpool } from 'react-icons/gi'
import Search from './componentes/buscar'
import Addfilms from './componentes/Addfilms'
import AppointmentInfo from './componentes/Appointmentinfo'

function App() {
  let [appointmentList, setAppointmentList] = useState([])
  let [query, setQuery] = useState('')

  const filterAppointments = appointmentList.filter(
    item => {
      return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  )

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
      <Addfilms />
      <Search query={query} onQueryChange={myQuery => setQuery(myQuery)} />

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
