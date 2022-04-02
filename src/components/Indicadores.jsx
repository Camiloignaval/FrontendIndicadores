/* eslint-disable react/jsx-indent */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CardIndicador } from './CardIndicador'
import { SelectBuscar } from './SelectBuscar'
import { motion } from 'framer-motion'
import { arrayIndicadoresNecesarios } from '../helpers/arraySolicitados'
import { alertSwal } from '../helpers/alertSwal'

// framer motion
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

export const Indicadores = () => {
  const [ListaIndicadores, setListaIndicadores] = useState([])
  const [indicadorSeleccionado, setIndicadorSeleccionado] = useState('')
  const [infoSeleccionado, setInfoSeleccionado] = useState()
  const [isMobile, setisMobile] = useState(true)
  const [necesariosDesdeSmall, setNecesariosDesdeSmall] = useState([])
  //   llamada a API
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios('https://mindicador.cl/api')
        setListaIndicadores(data)
        // filtrar solo loos necesarios para que se muestren desde small hacia arriba
        const filtrados = (Object.entries(data).filter(e => arrayIndicadoresNecesarios.includes(e[0]))).map(d => d[1])
        setNecesariosDesdeSmall(filtrados)
      } catch (error) {
        alertSwal(false, 'Ha ocurrido un error')
      }
    })()
  }, [])

  //   atento a tamaño de pantalla
  useEffect(() => {
    if (window.innerWidth >= 576) {
      setisMobile(false)
    }
  }, [window])
  //

  useEffect(() => {
    const updateWindowDimensions = () => {
      console.log(window.innerWidth)
      if (window.innerWidth >= 576) {
        setisMobile(false)
      } else {
        setisMobile(true)
      }
    }

    window.addEventListener('resize', updateWindowDimensions)

    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [window.innerWidth])

  //

  useEffect(() => {
    setInfoSeleccionado(null)
    setTimeout(() => {
      if (indicadorSeleccionado !== '') {
        setInfoSeleccionado(ListaIndicadores[indicadorSeleccionado])
      }
    }, 0)
  }, [indicadorSeleccionado])

  return (
    <div className='mb-20'>
      {isMobile
      //   si es dispositivo mobil
        ? <div className='container grid grid-cols-1 w-100 mt-10'>
          <div className='m-auto'> <SelectBuscar setIndicador={setIndicadorSeleccionado} indicador={indicadorSeleccionado} /></div>
          {infoSeleccionado &&
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
              }} className='mt-8 mx-10'
            ><CardIndicador info={infoSeleccionado} />
            </motion.div>}
          </div>
        // siesque no esta en dispositivo mobil
        : <>
          <motion.div
            variants={container}
            initial='hidden'
            animate='visible' className='mt-10 container mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'
          >
            {necesariosDesdeSmall.map(n => <CardIndicador key={n.codigo} info={n} />)}
          </motion.div>
          </>}
    </div>

  )
}
