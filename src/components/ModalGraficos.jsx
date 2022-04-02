/* eslint-disable react/jsx-indent */
import axios from 'axios'
import { useState, useEffect } from 'react'
import { GraficoHistorial } from './GraficoHistorial'

export const ModalGraficos = ({ codigo, nombre }) => {
  const [showModal, setShowModal] = useState(false)
  const [infoUltimoMes, setInfoUltimoMes] = useState()

  useEffect(() => {
    (async () => {
      const { data } = await axios(`https://mindicador.cl/api/${codigo}`)
      setInfoUltimoMes(data.serie.slice().reverse())
    })()
  }, [])

  return (
    <>
      <button
        className='bg-gray-600 text-white hover:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={() => setShowModal(true)}
      >
        Ver más<i className='fas fa-chart-bar ml-2' />
      </button>
      {showModal
        ? <div className=''>
          <div
            className=' rounded justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
          >
            <div className='relative w-auto my-6 mx-auto max-w-3xl '>
              {/* content */}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/* header */}
                <div className=' px-4 flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className='w-100 text-3xl font-semibold mx-auto'>
                    DATOS HISTORICOS {nombre.toUpperCase()}
                  </h3>
                  <button
                    className='absolute right-0 top-0 p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className='relative p-6 flex-auto bodyModal'>
                   <GraficoHistorial infoUltimoMes={infoUltimoMes.reverse()} codigo={codigo} />
                </div>
                {/* footer */}
                <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='bg-gray-500 text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
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
