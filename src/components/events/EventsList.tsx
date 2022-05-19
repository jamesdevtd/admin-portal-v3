import Image from 'next/image'
import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEvents, getEventsListState } from '@/features/eventsListing/eventsList';

import loaderImgUrl from '~/images/loading.gif';

export default function EventsList() {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector(getEventsListState);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  function eventList() {
    return (
      <ul className='list-decimal mx-3 animate-in fade-in-0 delay-150 duration-1000'>
        {events.map(i => {
          return (
            <li key={i?.id}>
              <span>{i.name}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='animate-in fade-in delay-150 duration-500'>
      <h3>Middleware test: Events List</h3>
      {(loading) ?
        <Image src={loaderImgUrl} alt="loader" /> :
        eventList()
      }
    </div>
  )
}