import React from 'react'
import { ModalSearch } from './ModalSearch'

export const Header = () => {
  return (
    <nav className='items-center justify-between flex-wrap dark:bg-gray-700 p-6'>
      <div className='items-center text-white mr-6 relative grid grid-cols-2'>
        <span className='font-semibold text-xl tracking-tight'><i className='fas fa-chart-line' /> Indicadores Financieros</span>
        <div className='font-semibold text-xl tracking-tight text-right'><ModalSearch /></div>
      </div>
    </nav>
  )
}
