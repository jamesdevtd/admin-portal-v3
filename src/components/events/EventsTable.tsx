import moment from 'moment';
import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import StyledTableWrap from '@/components/layout/StyledTableWrap';

import seriesNames from '@/static/seriesNames';
import { truncateString } from '@/utils/stringUtils';

import { EventListingProps } from '@/types/event';


// TODO: add loading placeholder whilst actual images are being loaded from cloud
const eventPhoto = '/images/mock/event-thumb.jpg';
const eventLogo = '/images/mock/logo-thumb.png';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  events: EventListingProps[]
};

const EventsTable = ({ events }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);


  return (
    <StyledTableWrap>
      <table className="table-auto w-full">
        <thead className='text-white'>
          <tr>
            <th className="w-14">Type</th>
            <th>Name</th>
            <th className="w-24">League</th>
            <th className="w-16">Country</th>
            <th className="w-32">Series</th>
            <th className="w-18">Date Start</th>
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
              <td><span className="tag capsule">{event.type}</span></td>
              <td className="name">{event?.name}</td>
              <td className="league">{event.league}</td>
              <td><CircleFlag countryCode="us" className="h-4" /></td>
              <td>{seriesNames[event.series - 1].name}</td>
              <td>{moment(event.dateStart).format('d/m/yyyy')}</td>
              <td>{event.entryFees}</td>
              <td><span className={`rounded-full px-3 w-full block text-center text-white capitalize ${event?.status === 'closed' ? 'bg-red-warning' : event?.status === 'open' ? 'bg-blue-brand' : 'bg-orange'}`}>{event?.status}</span></td>
              <td>{event.location}</td>
              <td>{truncateString(event?.divisions as string, 30)}</td>
              <td className='w-12'>{event?.teams}</td>
              <td className='w-12'><button><HiOutlinePencilAlt className="text-xl text-gray-light" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableWrap>

  );
};

export default EventsTable;
