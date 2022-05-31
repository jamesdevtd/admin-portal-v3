import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks';


export default function EventsList() {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector(getEventsListState);

  useEffect(() => {
    // 
  }, []);

  function tableRows() {
    return (
      <div className='list-decimal mx-3 animate-in fade-in-0 delay-150 duration-1000'>
        {events &&
          events.map(i => {
            return (
              <div key={i?.id}>
                <span>{i.name}</span>
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className='StyleTable'>
      <div className="ml-5 mb-1 overflow-visible rounded-lg bg-blue-gradient pb-1">
        <div className='flex flex-row gap-3 text-white font-semibold p-3'>
          <div className='w-14' >Type</div>
          <div className='w-14' >Name</div>
          <div>Name</div>
          <div>League</div>
        </div>
        <div className="rounded-md shadow-[0px_0px_10px_2px_rgba(0,0,0,0.16)] -left-4  bg-white w-full h-20 relative"
          style={{ width: 'calc(100% + 12px)' }}
        ></div>
      </div>
    </div>

  )
}