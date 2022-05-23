import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import styles from './EventsTable.module.scss';


// TODO: add loading placeholder whilst actual images are being loaded from cloud
const eventPhoto = '/images/mock/event-thumb.jpg';
const eventLogo = '/images/mock/logo-thumb.png';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  events: any[]
};

const EventsTable = ({ events }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);


  return (
    <div className={styles.EventsTable}>
      <div className="card-bg drop-shadow-xl m-3 rounded-lg shadow-blue-dark">
        <table className="table-auto w-full">
          <thead className='text-white'>
            <tr>
              <th className="w-14">Type</th>
              <th>Name</th>
              <th className="w-24">League</th>
              <th className="w-16">Country</th>
              <th className="w-16">Series</th>
              <th className="w-16">Date Start</th>
              <th className="w-18">Entry Fees</th>
              <th className="w-18">Status</th>
              <th className="w-32">Location</th>
              <th className="w-24">Divisions</th>
              <th className="w-8">Teams</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: any) => (
              <tr key={event?.id}>
                <td><span className="tag capsule">open</span></td>
                <td className="uppercase text-blue-brand font-bold">{event?.name}</td>
                <td className="uppercase text-blue-brand font-bold">{event?.series?.name}</td>
                <td><CircleFlag countryCode="us" className="h-4" /></td>
                <td>{event?.series?.id}</td>
                <td>09/14/2021</td>
                <td>FREE - $25</td>
                <td><span className={`rounded-full px-3 w-full block text-center text-white capitalize ${event?.status === 'closed' ? 'bg-red-warning' : event?.status === 'open' ? 'bg-blue-brand' : 'bg-orange'}`}>{event?.status}</span></td>
                <td>Edwin Flack Avenue, Sydney Olympic Park, 2127</td>
                <td>Men’s, Mixed, Women’s, Youth</td>
                <td>{event?.teams}</td>
                <td><button><HiOutlinePencilAlt className="text-xl text-gray-light" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default EventsTable;
