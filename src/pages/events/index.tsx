import { useState } from 'react';

import styles from './Events.module.scss';

import Card from '@/components/events/Card';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';

import CalendarIcon from '~/icons/blue/calendar.svg';

export default function Events() {
  const [creatingEvent, setCreatingEvent] = useState<boolean>(false);

  const eventCategories = ['All', 'Draft', 'Published', 'Active', 'Past'];

  const events: any = [
    { id: 1, name: 'NY SEVENS', status: 'live', series: { name: 'Series 1' } },
    { id: 2, name: 'NY SEVENS', status: 'closed', series: { name: 'Series 2' } },
    { id: 3, name: 'NY SEVENS', status: 'open', series: { name: 'Series 3' } },
    { id: 4, name: 'NY SEVENS', status: 'live', series: { name: 'Series 4' } },
    { id: 5, name: 'NY SEVENS', status: 'open', series: { name: 'Series 5' } },
    { id: 6, name: 'NY SEVENS', status: 'closed', series: { name: 'Series 6' } },
    { id: 7, name: 'NY SEVENS', status: 'closed', series: { name: 'Series 7' } },
    { id: 7, name: 'NY SEVENS', status: 'open', series: { name: 'Series 8' } },
    { id: 7, name: 'NY SEVENS', status: 'open', series: { name: 'Series 9' } }
  ];

  const createNewEventHandler = () => {
    setCreatingEvent(true);
  };


  return (
    <Layout>
      {!creatingEvent && (
        <ContentWrap className='max-w-7xl'>
          <div className={styles.Events}>
            <header className='content-header'>
              <CalendarIcon />
              <h2>Events</h2>
              <button className='btn ml-auto' onClick={createNewEventHandler}>
                Create New Event
              </button>
            </header>
            <div className='flex flex-row space-x-8'>
              {eventCategories.map((eventCategory) => (
                <div
                  key={eventCategory}
                  className='card w-32 rounded-md bg-gradient-to-b from-blue-400 to-sky-400 p-2 text-white'
                >
                  <div className='card-body space-y-2'>
                    <p className='card-header'>{eventCategory} Events</p>
                    <div className='flex-end flex flex-row justify-between'>
                      <p className='text-3xl'>
                        {Math.floor(Math.random() * 100)}
                      </p>
                      <span className='self-end'>Events</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentWrap>
      )}

      <ContentWrap className="grid xl:grid-cols-4 sm:grid-cols-1 gap-4 justify-start max-w-7xl">
        {events.map((event: any) => <Card key={event.id} event={event} />)}
      </ContentWrap>

    </Layout>
  );
}
