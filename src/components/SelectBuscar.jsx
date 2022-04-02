import React from 'react'
import { arrayIndicadoresNecesarios } from '../helpers/arraySolicitados'

export const SelectBuscar = ({ indicador, setIndicador }) => {
  return (
    <div className=' m-auto'>
      <select value={indicador} onChange={e => setIndicador(e.target.value)} className='block w-52 text-white py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500' name='indicators'>
        <option value='' disabled>
          Selecciona un indicador
        </option>
        {arrayIndicadoresNecesarios.map(a => (
          <option key={a} value={a} className='capitalize'>
            {a.replace('_', ' ')}
          </option>))}

      </select>
    </div>
  )
}
