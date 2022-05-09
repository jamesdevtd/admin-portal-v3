import React from 'react'

import styles from './Review.module.scss';

import { useAppSelector } from '@/app/hooks'
import { getBasicInfo } from '@/features/eventCreation/basicInfoSlice';

import ClonedEventEditor from './ClonedEventEditor';

export default function ClonedEvents() {
  const basicInfo = useAppSelector(getBasicInfo);

  return (
    <div className={`${styles.ClonedEvents} cloned-edevents`}>
      {basicInfo.additionalEvents.map(event => {
        return (
          <ClonedEventEditor key={event.month} monthId={event.month} name={event.name} />
        )
      })

      }</div>
  )
}