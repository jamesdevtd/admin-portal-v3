
import moment from 'moment';
import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';

import styles from './Cards.module.scss';

import seriesNames from '@/static/seriesNames';

import { EventListingProps } from '@/types/event';

import CalenderIcon from '~/svg/calender.svg';
import MenuIcon from '~/svg/event-menu-icon.svg';
import FeeIcon from '~/svg/fee-icon.svg';
import MapIcon from '~/svg/map-pin.svg';

// TODO: add loading placeholder whilst actual images are being loaded from cloud
const eventPhotoPlaceholder = '/images/mock/event-thumb.jpg';
const eventLogoPlaceholder = '/images/mock/logo-thumb.png';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  event: EventListingProps
};

const Card = ({ event }: Props) => {
  const [showMenu, setshowMenu] = useState<boolean>(false);
  const timeZone = moment().format('z');

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
          <span className="tag capsule">{event.type}</span>
          <div className={`flag code-${event.country}`}>
            <CircleFlag countryCode={event.country.toLowerCase()} height="35" />
          </div>
        </div>
        <div className="headings">
          <h3> {event?.name}</h3>
          <p className='series'>
            {seriesNames[event.series - 1].name} | &nbsp;
            <span className={`status ${event?.status === 'closed' ?
              'text-red-500' : event?.status === 'open' ?
                'text-green-500' : 'text-blue-brand'
              }`}>Event {event?.status}</span>
          </p>
          <p className="teams">
            <span className='count'>{event.teams}</span> Teams
          </p>
          <hr />
        </div>

        <div className="meta">
          <div>
            <CalenderIcon />
            <span className='uppercase'>
              {moment(event.startDate).format('ddd')} &nbsp;
              {moment(event.startDate).format('ll')} at &nbsp;
              {event.startTime} {moment(event.startDate).format('z')} </span>
          </div>
          <div>
            <MapIcon />
            <span>{event.location}, {event.city}</span>
          </div>
          <div>
            <FeeIcon />
            <span>{event.entryFees}</span>
          </div>
          <hr />
        </div>

        <div className='divisions'>
          <p>{event.divisions}</p>
        </div>

      </div>
    </div >
  );
};

export default Card;