import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from './Events.module.scss';

import Card from '@/components/events/Card';
import SearchBar from '@/components/events/SearchBar';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';

import { useAppSelector } from '@/app/hooks';
import { getFilters } from '@/features/eventsListing/eventsFiltersSlice';

import CalendarIcon from '~/icons/blue/calendar.svg';

export default function Events() {
  const Filters = useAppSelector(getFilters);

  const [creatingEvent, setCreatingEvent] = useState<boolean>(false);
  const [FilteredEvents, setFilteredEvents] = useState([]);
  const [UserId, setUserId] = useState<number>(0);

  const eventCategories = ['All', 'Draft', 'Published', 'Active', 'Past'];

  const events: any = [
    { id: 1, userId: 1, name: 'NY Sevens', type: 'open', division: 'mens', status: 'live', series: { name: 'Series 1' } },
    { id: 2, userId: 2, name: 'NY Sevens', type: 'draft', division: 'womens', status: 'closed', series: { name: 'Series 2' } },
    { id: 3, userId: 3, name: 'Ladies Spring Open', type: 'draft', division: 'mens', status: 'open', series: { name: 'Series 3' } },
    { id: 4, userId: 4, name: 'NY Sevens', type: 'open', division: 'mens', status: 'live', series: { name: 'Series 4' } },
    { id: 5, userId: 5, name: 'NY Sevens', type: 'open', division: 'womens', status: 'open', series: { name: 'Series 5' } },
    { id: 6, userId: 6, name: 'NY Sevens', type: 'draft', division: 'mens', status: 'closed', series: { name: 'Series 6' } },
    { id: 7, userId: 7, name: 'NY Sevens', type: 'open', division: 'mens', status: 'closed', series: { name: 'Series 7' } },
    { id: 8, userId: 8, name: 'NY Sevens', type: 'draft', division: 'womens', status: 'open', series: { name: 'Series 8' } },
    { id: 9, userId: 9, name: 'NY Sevens', type: 'open', division: 'mens', status: 'open', series: { name: 'Series 9' } }
  ];

  const createNewEventHandler = () => {
    setCreatingEvent(true);
  };
  useEffect(() => {
    const FEvents = events.filter((f: any) => {
      if (
        (Filters.search === "" || f.name.indexOf(Filters.search) > -1) &&
        (Filters.type === 'All' || f.type.toLowerCase() === Filters.type.toLowerCase()) &&
        (Filters.series === 'All' || f.series.name.toLowerCase() === Filters.series.toLowerCase()) &&
        (Filters.division === 'All' || f.division === Filters.division.toLowerCase()) &&
        (Filters.status === 'All' || f.status === Filters.status.toLowerCase()) &&
        (Filters.own === false || (UserId !== 0 && f.userId === UserId))
      )
        return f;
    });
    setFilteredEvents(FEvents);
  }, [Filters])


  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        setUserId(0);
      } else {
        setUserId(session?.user?.userId);
      }
    });
  }, []);


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

      <ContentWrap>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-start max-w-7xl">
          {FilteredEvents.map((event: any) => <Card key={event.id} event={event} />)}
        </div>
      </ContentWrap>

    </Layout>
  );
}
