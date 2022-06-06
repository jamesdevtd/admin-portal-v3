import React, { useEffect, useState } from 'react'
import { CircleFlag } from 'react-circle-flags';

import styles from './StyledTable.module.scss';

import { eventColumns } from '@/static/events';
import mockEventsList from '@/static/events-list.json';
import { truncateString } from '@/utils/stringUtils';

import { EventListingProps } from '@/types/event';

import EditIcon from '~/icons/edit.svg';

export default function StyledTable() {
  // TODO: make this Table component more dynamic in a way that it acceps columns and rows as props. 
  const [events, setEvents] = useState<EventListingProps[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    setEvents(mockEventsList);
    setColumns(eventColumns);
  }, []);

  const tableRows = events.map((item, index) =>
    <tr key={index}>
      <td>
        <span className='capsule'>{item.status}</span>
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
        <span>{item.series}</span>
      </td>
      <td>
        <span>{item.startDate}</span>
      </td>
      <td>
        <span>{item.entryFees}</span>
      </td>
      <td className={`status ${item.status}`}>
        <span className='capsule'>{item.status}</span>
      </td>
      <td>
        <span>{item?.location}, {item?.city}</span>
      </td>
      <td>
        <span>{truncateString(item?.divisions as string, 30)}</span>
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