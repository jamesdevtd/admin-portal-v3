
type Props = {
  // TODO: set event inteface for card, just take eventries from EventProps from event.ts
  event: any
};


import { useState } from 'react';

import styles from './Cards.module.scss';

import CalenderIcon from '~/svg/calender.svg';
import MenuIcon from '~/svg/event-menu-icon.svg';
import FeeIcon from '~/svg/fee-icon.svg';
import MapIcon from '~/svg/map-pin.svg';

const eventPhoto = 'images/mock/event-photo.png';
const eventLogo = 'images/mock/league-logo.png';
const eventFlag = 'images/mock/flag-us.png';

const Card = ({ event }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);

  return (
    <div className={`max-w-sm rounded-2xl overflow-hidden shadow-lg relative h-96 ${styles.card}`}>
      <img className="w-full" src={eventPhoto} alt="Sunset in the mountains" />
      <button onClick={() => setshowMenu(!showMenu)} className='right-menu-icon absolute right-0 top-0 bg-sky-400 p-2 w-10 h-10 rounded-bl-lg text-lg'>
        <MenuIcon />
      </button>
      <div className={`menu-link bg-white absolute right-5 top-5 rounded pb-3 z-50 ${!showMenu && 'hidden'}`}>
        <a href="#" className='font-bold text-cyan-800 block pr-3 pl-3 pt-3'>Edit Event</a>
        <a href="#" className='font-bold text-cyan-800 pr-3 pl-3 pb-3'>View Public Event Page</a>
        <div className='border-b-2 pt-3 mb-2'></div>
        <a href="#" className='pr-3 pl-3 text-red-500' > Unpublish Event</a >
      </div >

      <div className='bg-gradient rounded-2xl absolute top-20 bottom-0'>
        <div className='logo-sec'>
          <img alt="test" className="rounded-full w-20 h-20 -mt-14 m-auto" src={eventLogo}></img>
        </div>
        <div className="px-6 pb-2 d-flex justify-between">
          <span className="bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Open </span>
        </div>
        <div className='right-flag relative'>
          <img alt="test" className="text-right absolute right-4 bottom-2 rounded-full w-8 h-8" src={eventFlag}></img>
        </div>
        <div className="py-4">
          <div className="font-bold text-xl mb-2 text-center stone:900"> {event?.series?.name}</div>
          <p className="text-gray-600 text-base text-center">
            {event?.series?.name} | <span className={`font-bold ${event?.status === 'closed' ? 'text-red-500' : event?.status === 'open' ? 'text-green-500' : 'text-blue-500'}`}>Event {event?.status}</span>
          </p>
          <p className="text-gray-700 text-base text-center font-bold">
            <span className='text-sky-300'>8</span> Teams
          </p>
        </div>
        <div className='border-b w-20 m-auto'></div>
        <div className="flex py-3 place-items-center flex-col font-bold text-cyan-800">
          <div className='flex items-center w-2/3'><CalenderIcon /> <span className='pl-3'>Sat,Sep 14,2022 at 4:00 PM EST</span></div>
          <div className='flex items-center w-2/3'><MapIcon /> <span className='pl-3'>Randall&apos;s Island Manhattan, NY</span></div>
          <div className='flex items-center w-2/3'><FeeIcon /> <span className='pl-3'>Free - $25</span></div>
        </div>
        <div className='border-b w-20 m-auto'></div>
        <div className='px-6 py-4'>
          <p className='text-center text-xs text-gray-400'>Men&apos;s Soc. Men&apos;s Comp. Coed Sec. Coed Comp. U6 Boys.U7 Girls. U10 Boys. U12 Girls</p>
        </div>
      </div>
    </div >
  );
};

export default Card;
