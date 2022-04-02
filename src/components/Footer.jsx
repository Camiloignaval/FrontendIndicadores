import dayjs from 'dayjs'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='w-screen mt-5 p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
      <span className='justify-center flex text-sm text-gray-500 sm:text-center dark:text-gray-400'>© 2022 Datos entregados por <a href='https://mindicador.cl/' className='hover:underline ml-1'>mindicador.cl</a>.
      </span>
      <div className=' capitalize justify-center flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
        {dayjs().format('dddd DD MMMM YYYY')}
      </div>
    </footer>
  )
}
