import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from './Events.module.scss';

import Card from '@/components/events/Card';
import EventsTable from '@/components/events/EventsTable';
import SearchBar from '@/components/events/SearchBar';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';

import { useAppSelector } from '@/app/hooks';
import { getFilters } from '@/features/eventsListing/eventsFiltersSlice';
import { mockEventsForCards } from '@/static/events';

import CalendarIcon from '~/icons/blue/calendar.svg';
import CalendarWhiteIcon from '~/icons/calendar.svg';
import PlusIcon from '~/icons/plus-box.svg';

export default function Events() {
  const filters = useAppSelector(getFilters);

  const [creatingEvent, setCreatingEvent] = useState<boolean>(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userId, setUserId] = useState<number>(0);

  const eventCategories = ['all', 'draft', 'published', 'active', 'past'];
  const router = useRouter();
  // TODO: replace mockEventsForCards with values from store fetched from API
  const events = mockEventsForCards;

  const createNewEventHandler = () => {
    // TODO: replace 1 with next available event id to be set as draft mode from API or just create a new url for event creation i,e, event-creation
    router.push('/events/1');
  };
  useEffect(() => {
    const filtered: any = events.filter((f: any) => {
      if (
        (filters.search === "" || f.name.indexOf(filters.search) > -1) &&
        (filters.type === 'all' || f.type.toLowerCase() === filters.type.toLowerCase()) &&
        (filters.series === 'all' || f.series.name.toLowerCase() === filters.series.toLowerCase()) &&
        (filters.division === 'all' || f.division === filters.division.toLowerCase()) &&
        (filters.status === 'all' || f.status === filters.status.toLowerCase()) &&
        (filters.own === false || (userId !== 0 && f.userId === userId))
      )
        return f;
    });
    setFilteredEvents(filtered);
  }, [filters])


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
              <button className='btn create' onClick={createNewEventHandler}>
                <PlusIcon />
                Create New Event
              </button>
            </header>
            <div className='summary-cards'>
              {eventCategories.map((eventCategory) => (
                <div
                  key={eventCategory}
                  className='card'
                >
                  <div className='card-body space-y-2'>
                    <p className='card-header'><CalendarWhiteIcon /> {eventCategory} Events</p>
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

      <ContentWrap className='max-w-7xl'>
        <SearchBar />
        {filters.view === "card" ?
          <div className={styles.cardsView}>
            {filteredEvents.map((event: any) => <Card key={event.id} event={event} />)}
          </div> :
          <EventsTable events={filteredEvents} />
        }
      </ContentWrap>

    </Layout>
  );
}
