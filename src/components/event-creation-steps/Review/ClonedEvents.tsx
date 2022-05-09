import React from 'react'

import { useAppSelector } from '@/app/hooks'
import { getBasicInfo } from '@/features/eventCreation/basicInfoSlice';



export default function ClonedEvents() {
  const basicInfo = useAppSelector(getBasicInfo);

  return (
    <div>{basicInfo.additionalEvents.map(event => {
      return (
        <div className="event" key={event.month}>
          <h3>Series {event.month}</h3>
        </div>
      )
    })

    }</div>
  )
}