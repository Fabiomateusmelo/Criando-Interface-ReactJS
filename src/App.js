import './index.css'
import { GiFilmSpool } from 'react-icons/gi'
import Search from './componentes/buscar'
import Addfilms from './componentes/Addfilms'

export default function App() {
  return (
    <div className="App container mx-auto mt-5 font-thin">
      <h1 className="text-5xl text-blue-700 mb-3">FilmsG
      <GiFilmSpool className="inline-block text-blue-500" /></h1>
      <Addfilms />
      <Search />
    </div>
  )
}


