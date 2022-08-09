import './index.css'
import { GiFilmSpool } from 'react-icons/gi'
import { BiTrash } from 'react-icons/bi'
import Search from './componentes/buscar'
import Addfilms from './componentes/Addfilms'
import appointmentList from './componentes/data.json'

export default function App() {
  return (
    <div className="App container mx-auto mt-5 font-thin">
      <h1 className="text-5xl text-blue-700 mb-3">FilmsG
      <GiFilmSpool className="inline-block text-blue-500" /></h1>
      <Addfilms />
      <Search />

      <ul className="divide-y divide-gray-200">
        {appointmentList
          .map(appointment => (
            <li className="px-3 py-3 flex items-start">
              <button type="button"
                className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <BiTrash /></button>
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className="flex-none font-medium text-2xl text-blue-500">{appointment.petName}</span>
                  <span className="flex-grow text-right">{appointment.aptDate}</span>
                </div>
                <div><b className="font-bold text-blue-500">Owner:</b> {appointment.ownerName}</div>
                <div className="leading-tight">{appointment.aptNotes}</div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}


