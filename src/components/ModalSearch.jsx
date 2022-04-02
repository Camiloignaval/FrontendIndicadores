/* eslint-disable react/jsx-indent */
import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { alertSwal } from '../helpers/alertSwal'
import { SelectBuscar } from './SelectBuscar'
import { RevolvingDot } from 'react-loader-spinner'
import { motion } from 'framer-motion'

const medidas = { Dólar: 'USD', Pesos: 'CLP', Porcentaje: '%' }

export const ModalSearch = () => {
  const [showModal, setShowModal] = useState(false)
  const [indicador, setIndicador] = useState('')
  const [fecha, setFecha] = useState('')
  const [infoEncontrada, setInfoEncontrada] = useState('')
  const [loading, setloading] = useState(false)

  //   reiniciar indicador seleccionado
  const cerrarModal = () => {
    setShowModal(false)
    setIndicador('')
    setFecha('')
  }

  useEffect(() => {
    (async () => {
      if (fecha !== '' && indicador !== '') {
        setloading(true)
        try {
          const { data } = await axios(`https://mindicador.cl/api/${indicador}/${dayjs(fecha).format('DD-MM-YYYY')}`)
          if (data.serie.length === 0) {
            alertSwal(false, 'Fecha escogida no contiene registros')
          } else {
            setInfoEncontrada(`${data?.serie[0]?.valor} ${medidas[data?.unidad_medida]}`)
          }
        } catch (error) {
          alertSwal(false, 'Ha ocurrido un error')
        }
      }
      setloading(false)
    })()
  }, [fecha, indicador])

  //   limpiar fecha al cambiar indice
  useEffect(() => {
    if (indicador !== '') {
      setFecha('')
      setInfoEncontrada('')
    }
  }, [indicador])

  return (
    <>
      <button
        className='bg-gray-600 text-white hover:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={() => setShowModal(true)}
      >
       Consultar por fecha <i class='fas fa-search' />
      </button>
      {showModal
        ? <div className=''>
          <div
            className='rounded justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
          >
            <div className='relative w-auto my-6 mx-auto max-w-3xl '>
              {/* content */}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/* header */}
                <div className='px-4 flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>

                  <button
                    className='absolute right-0 top-0 p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={cerrarModal}
                  >
                    <span className='bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}

                <div className='relative p-6 flex-auto bodyModal text-black grid grid-cols-2 gap-3'>
                    <SelectBuscar indicador={indicador} setIndicador={setIndicador} />
                    <input max={dayjs().format('YYYY-MM-DD')} value={fecha} onChange={e => setFecha(e.target.value)} className='rounded py--2 pl-2 h-11 mt-1/2' type='date' style={{ backgroundColor: '#384151', color: 'white' }} />
                {/* informacion */}

                {loading
                  ? <div className='relative mx-auto col-span-2 z-10'>
                    <RevolvingDot color='#384151' height={100} width={100} />
                    </div>
                  : (infoEncontrada !== '' && fecha !== '') &&
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1 }} className='text-black text-6xl sm:text-7xl mx-auto col-span-2'
                    >
                        {infoEncontrada}
                    </motion.div>}
                </div>
                {/* footer */}
                <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='bg-gray-500 text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={cerrarModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black' />
          </div>
        : null}
    </>
  )
}
