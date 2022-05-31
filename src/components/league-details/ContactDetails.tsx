import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import styles from '../events/Grid.module.scss';

import ContactDetails from '@/types/contactDetails';


type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  contacts: ContactDetails[]
};

const ContactDetails = ({ contacts }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);


  return (
    <div className={styles.Grid}>
      <div className="card-bg mb-3 mx-6 rounded-lg">
        <table className="table-auto w-full">
          <thead className='text-white'>
            <tr>
              <th className="w-14">Type</th>
              <th className="w-52">Name</th>
              <th className="w-36">League</th>
              <th className="w-16">Country</th>
              <th className="w-16">Series</th>
              <th className="w-16">Date Start</th>
              <th className="w-24">Entry Fees</th>
              <th className="w-8">Status</th>
              <th className="w-52">Location</th>
              <th className="w-52">Divisions</th>
              <th className="w-8">Teams</th>
              <th className="w-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sdfsdf</td>
            </tr>
            {contacts.map((event: any) => (
              <tr key={event?.id}>
                <td><span className="tag capsule">open</span></td>
                <td className="uppercase font-bold"><a className="text-blue-brand hover:text-blue-600" href="#">{event?.name}</a></td>
                <td className="uppercase font-bold"><a className="text-blue-brand hover:text-blue-600" href="#">{event?.series?.name}</a></td>
                <td><CircleFlag countryCode="us" className="h-4" /></td>
                <td>{event?.series?.id}</td>
                <td>09/14/2021</td>
                <td>FREE - $25</td>
                <td><span className={`rounded-full px-3 w-20 block text-center text-white capitalize ${event?.status === 'closed' ? 'bg-red-warning' : event?.status === 'open' ? 'bg-blue-brand' : 'bg-orange'}`}>{event?.status}</span></td>
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

export default ContactDetails;