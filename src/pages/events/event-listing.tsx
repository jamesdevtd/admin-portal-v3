import { useState } from 'react';

import styles from './Events.module.scss';

import Layout from '@/components/layout/Layout';

import CalendarIcon from '~/icons/blue/calendar.svg';

export default function Events() {
  const [creatingEvent, setCreatingEvent] = useState<boolean>(false);

  const eventCategories = ['All', 'Draft', 'Published', 'Active', 'Past'];

  const createNewEventHandler = () => {
    setCreatingEvent(true);
  };


  return (
    <Layout>
      {!creatingEvent && (
        <div className='white-box'>
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
        </div>
      )}

      <div className="white-box text-center">
        <br />
        <br />
        <h3>Another white box contained content here...</h3>
        <br />
        <br />
        <br />
      </div>

    </Layout>
  );
}
