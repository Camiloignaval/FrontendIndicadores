import dayjs from 'dayjs'
import React from 'react'
import { ModalGraficos } from './ModalGraficos'

const medidas = { Dólar: 'USD', Pesos: 'CLP', Porcentaje: '%' }

export const CardIndicador = ({ info }) => {
  return (
    <>
      <div className='shadow-lg rounded-2xl p-4 bg-white relative overflow-hidden'>
        <div className='relative min-h-full grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <div className='row-span-2'>
            <p className='text-gray-900 text-xl font-medium mb-2'>
              {`${info?.nombre} medido en ${info?.unidad_medida}`}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-indigo-500 text-xl font-medium'>
              {`${info?.valor} ${medidas[info?.unidad_medida]}`}
            </p>
            <p className='text-gray-400 text-xs'>
              Valor al dia {dayjs(info?.fecha).format('DD MMMM YYYY')}
            </p>
          </div>
          <div className='col-end-3 relative bottom-0 right-0  text-right hidden sm:block'>
            <ModalGraficos codigo={info?.codigo} nombre={info?.nombre} />
          </div>
        </div>
      </div>

    </>
  )
}
