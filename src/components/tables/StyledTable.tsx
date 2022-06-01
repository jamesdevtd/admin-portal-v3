import React, { useEffect, useState } from 'react'
import { CircleFlag } from 'react-circle-flags';

import styles from './StyledTable.module.scss';

import { mockEventsForCards } from '@/static/events';
import { eventColumns } from '@/static/events';

import { EventListingProps } from '@/types/event';

import EditIcon from '~/icons/edit.svg';

export default function StyledTable() {
  // TODO: make this Table component more dynamic in a way that it acceps columns and rows as props. 
  const [events, setEvents] = useState<EventListingProps[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    setEvents(mockEventsForCards);
    setColumns(eventColumns);
  }, []);

  const tableRows = events.map((item, index) =>
    <tr key={index}>
      <td>
        <span className='capsule'>{item.type}</span>
      </td>
      <td className='name'>
        <span>{item.name}</span>
      </td>
      <td className='league'>
        <span>{item.league}</span>
      </td>
      <td className='country'>
        <CircleFlag countryCode={item.country || 'us'} />
      </td>
      <td>
        <span>{item.series.id}</span>
      </td>
      <td>
        <span>{item.dateStart}</span>
      </td>
      <td>
        <span>{item.entryFees}</span>
      </td>
      <td className={`status ${item.status}`}>
        <span className='capsule'>{item.status}</span>
      </td>
      <td>
        <span>{item?.location}</span>
      </td>
      <td>
        <span>{item?.divisions}</span>
      </td>
      <td>
        <span>{item?.teams}</span>
      </td>
      <td className='edit'>
        <button
          onClick={() => console.log(`edit event with ID ${item.id}`)}>
          <EditIcon />
        </button>
      </td>
    </tr>
  )


  return (
    <div className={styles.StyledTable}>

      <div className="behind"></div>
      <div className="front"></div>

      <table>
        <thead>
          <tr>
            {columns.map((item, index) => {
              return (
                <th key={index} className={item.replace(/\s+/g, '-').toLowerCase()}>
                  <span>{item}</span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>

  )
}