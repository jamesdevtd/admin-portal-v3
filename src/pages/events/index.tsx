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
// import { mockEventsForCards } from '@/static/events';
import mockEventsList from '@/static/events-list.json';

import CalendarIcon from '~/icons/blue/calendar.svg';
import CalendarWhiteIcon from '~/icons/calendar.svg';
import PlusIcon from '~/icons/plus-box.svg';

export default function Events() {
  const filters = useAppSelector(getFilters);

  const [creatingEvent, setCreatingEvent] = useState<boolean>(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  // TODO: set user ID to actual session ID, once actual events for affiliate users are available
  const [userId, setUserId] = useState<number>(1);

  // TODO: set as dynamic based on all events from GET
  const eventCategories = [
    ['all', 35],
    ['draft', 20],
    ['published', 3],
    ['active', 5],
    ['past', 2]
  ];

  const router = useRouter();
  // TODO: replace mockEventsForCards with values from store fetched from API
  const events = mockEventsList;

  const createNewEventHandler = () => {
    // TODO: replace 1 with next available event id to be set as draft mode from API or just create a new url for event creation i,e, event-creation
    router.push('/events/create-event');
  };
  useEffect(() => {
    // TODO: add interface for filtered events
    const filtered: any = events.filter((f: any) => {
      if (
        (filters.search === "" || f.name.indexOf(filters.search) > -1) &&
        (filters.type === 'all' || f.type.toLowerCase() === filters.type.toLowerCase()) &&
        (filters.series === 'all' || f.series === filters.series.toString()) &&
        (filters.division === 'all' || f.division === filters.division.toLowerCase()) &&
        (filters.status === 'all' || f.status === filters.status.toLowerCase()) &&
        (filters.country === 'all' || f.country === filters.country.toUpperCase()) &&
        (filters.own === false || (userId !== 0 && f.userId === userId))
      )
        return f;
    });
    setFilteredEvents(filtered);
  }, [filters])


  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        // TODO: uncomment below set user ID to 0, once actual events for affiliate users are available
        // setUserId(0);
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
              {eventCategories.map((item, i) => (
                <div
                  key={i}
                  className='card'
                >
                  <div className='card-body space-y-2'>
                    <p className='card-header'><CalendarWhiteIcon /> {item[0]} Events</p>
                    <div className='flex-end flex flex-row justify-between'>
                      <p className='text-3xl'>{item[1]}</p>
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
