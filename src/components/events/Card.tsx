
import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';

import styles from './Cards.module.scss';

import CalenderIcon from '~/svg/calender.svg';
import MenuIcon from '~/svg/event-menu-icon.svg';
import FeeIcon from '~/svg/fee-icon.svg';
import MapIcon from '~/svg/map-pin.svg';

// TODO: add loading placeholder whilst actual images are being loaded from cloud
const eventPhotoPlaceholder = '/images/mock/event-thumb.jpg';
const eventLogoPlaceholder = '/images/mock/logo-thumb.png';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  event: any
};

const Card = ({ event }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);

  return (
    <div className={styles.Card}>

      <div className="card-bg">
        <img src={event.photo ? event.photo : eventPhotoPlaceholder} alt="Event Photo" />
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
          <img alt="logo" src={event.logo ? event.logo : eventLogoPlaceholder}></img>
        </div>
        <div className="top">
          <span className="tag capsule">open</span>
          <div className="flag">
            <CircleFlag countryCode="us" height="35" />
          </div>
        </div>
        <div className="headings">
          <h3> {event?.name}</h3>
          <p className='series'>
            {event?.series?.name} | <span className={`status ${event?.status === 'closed' ? 'text-red-500' : event?.status === 'open' ? 'text-green-500' : 'text-blue-brand'}`}>Event {event?.status}</span>
          </p>
          <p className="teams">
            <span className='count'>8</span> Teams
          </p>
          <hr />
        </div>

        <div className="meta">
          <div>
            <CalenderIcon />
            <span>Sat,Sep 14,2022 at 4:00 PM EST</span>
          </div>
          <div>
            <MapIcon />
            <span>Randall&apos;s Island Manhattan, NY</span>
          </div>
          <div>
            <FeeIcon />
            <span>Free - $25</span>
          </div>
          <hr />
        </div>

        <div className='divisions'>
          <p>Men&apos;s Soc. Men&apos;s Comp. Coed Sec. Coed Comp. U6 Boys.U7 Girls. U10 Boys. U12 Girls</p>
        </div>
      </div>
    </div >
  );
};

export default Card;