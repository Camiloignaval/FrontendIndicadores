import { Header } from './components/Header'
import { Indicadores } from './components/Indicadores'
// eslint-disable-next-line no-unused-vars
import { es } from 'dayjs/locale/es'
import dayjs from 'dayjs'
import { Footer } from './components/Footer'
// import dayjs from 'dayjs';

dayjs.locale('es')

function App () {
  return (
    <div className='App relative'>
      <Header />
      <Indicadores className='' />
      <div className='absolute bottom-0'><Footer /></div>
    </div>
  )
}

export default App
