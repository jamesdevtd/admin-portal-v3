
import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';

import styles from './Cards.module.scss';

import CalenderIcon from '~/svg/calender.svg';
import MenuIcon from '~/svg/event-menu-icon.svg';
import FeeIcon from '~/svg/fee-icon.svg';
import MapIcon from '~/svg/map-pin.svg';

// TODO: add loading placeholder whilst actual images are being loaded from cloud
const eventPhoto = '/images/mock/event-thumb.jpg';
const eventLogo = '/images/mock/logo-thumb.png';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  event: any
};

const Card = ({ event }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);


  return (
    <div className={styles.Card}>
      <div className="card-bg">
        <img src={eventPhoto} alt="Event Photo" />
        <button onClick={() => setshowMenu(!showMenu)} className={`card-menu-button ${showMenu && 'active'}`}>
          <MenuIcon />
        </button>
        <div className={`${showMenu ? 'card-menu' : 'hidden'}`}>
          <a href="#" >Edit Event</a>
          <a href="#" >View Public Event Page</a>
          <button className='unpublish' > Unpublish Event</button>
        </div >
      </div>

      <div className='card-content'>
        <div className='logo'>
          <img alt="logo" src={eventLogo}></img>
        </div>
        <div className="top">
          <span className="tag capsule">open</span>
          <div className="flag">
            <CircleFlag countryCode="us" height="35" />
          </div>
        </div>
        <div className="headings">
          <h3> {event?.series?.name}</h3>
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
