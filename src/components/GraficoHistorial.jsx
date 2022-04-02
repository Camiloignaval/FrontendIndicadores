import React from 'react'
import { Line } from '@ant-design/charts'
import dayjs from 'dayjs'

export const GraficoHistorial = ({ infoUltimoMes }) => {
  const data = infoUltimoMes?.map(i => ({ dia: dayjs(i.fecha).format('DD-MM-YY'), valor: i.valor }))
  const config = {
    data,
    yField: 'valor',
    xField: 'dia',
    // tooltip: {
    //   customContent: (title, items) => {
    //     return (
    //       <>
    //         <h5 style={{ marginTop: 16 }}>{title}</h5>
    //         <ul style={{ paddingLeft: 0 }}>
    //           {items?.map((item, index) => {
    //             const { name, value, color } = item
    //             console.log(name, value, color)
    //             return (
    //               <li
    //                 key={item.year}
    //                 className='g2-tooltip-list-item'
    //                 data-index={index}
    //                 style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
    //               >
    //                 <span className='g2-tooltip-marker' style={{ backgroundColor: color }} />
    //                 <span
    //                   style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}
    //                 >
    //                   <span style={{ margiRight: 16 }}>{name}:</span>
    //                   <span className='g2-tooltip-list-item-value'>{value}</span>
    //                 </span>
    //               </li>
    //             )
    //           })}
    //         </ul>
    //       </>
    //     )
    //   }
    // },
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2
      }
    }
  }

  return <Line {...config} />
}
