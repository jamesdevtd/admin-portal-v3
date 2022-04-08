import Link from 'next/link';
import { useEffect, useState } from 'react';

import formStyles from '@/pages/dashboard/events/form-groups/style.module.scss';
import styles from '@/pages/dashboard/events/style.module.scss';

import { mockMenuItems } from '../../../mock-data/events-menu-items';

import CalendarIcon from '~/icons/blue/calendar.svg';
import EventIcon from '~/icons/grey/event.svg';
import RegIcon from '~/icons/grey/registration.svg';
import WarningIcon from '~/icons/grey/warning.svg';

interface MenuSubItems {
  icon: string;
  label: string;
  url: string;
}
interface MenuItems {
  heading: string;
  items: MenuSubItems[];
}

//TODO: convert series names from db
const seriesNames = [
  'Series 1 - January',
  'Series 2 - February',
  'Series 3 - March',
  'Series 4 - April',
  'Series 5 - May',
  'Series 7 - July',
  'Series 8 - August',
  'Series 9 - September',
  'Series 10 - October',
  'Series 11 - November',
  'Series 12 - December',
];

export default function Events() {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  useEffect(() => {
    setMenuItems(mockMenuItems);
  }, []);

  return (
    <div className={`${styles.basicInfo}`}>
      <header className='content-header'>
        <CalendarIcon />
        <h2>New Open Series</h2>
        <button className='draft'>Draft</button>
      </header>

      <div className='content-main'>
        <div className='sidebar'>
          <div className='nav'>
            {menuItems &&
              menuItems.map((group, i) => (
                <div key={i}>
                  <ul>
                    {group.items &&
                      group.items.map((item, i) => (
                        <li
                          key={i}
                          className={`${i > 3 ? 'inactive' : 'active'} ${i < 1 ? 'current' : ''
                            }`}
                        >
                          <Link href={item.url}>
                            <a>
                              <div className={`icon-box ${item.icon}`}>
                                {++i}
                              </div>
                              <span>{item.label}</span>
                            </a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
        <div className='main'>
          <h3>Basic Info</h3>

          <div className={`${formStyles.formGroup}`}>
            <WarningIcon />
            <div className='label'>
              <span>General</span>
            </div>
            <p className='instructions'>
              Name your event. Ex: An Example Name. Select the Series (Open 1 -
              January, Open 2 - February, etc.).
            </p>
            <div className='fields-group'>
              <div>
                <input
                  id='name'
                  type='text'
                  autoComplete='name'
                  placeholder='NY Sevens'
                  required
                />
                <label htmlFor='name'>Event Name</label>
              </div>
              <div>
                <select id='year' name='year'>
                  <option value='2022'>2022</option>
                  <option value='2023'>2023</option>
                  <option value='2023'>2024</option>
                </select>
                <label htmlFor='name'>Yer</label>
              </div>
              <div>
                <select id='seriesNames' name='seriesNames'>
                  {seriesNames.map((name, i) => (
                    <option key={i} value={i}>
                      {name}
                    </option>
                  ))}
                </select>
                <label htmlFor='name'>Series</label>
              </div>
            </div>
          </div>

          <div className={`${formStyles.formGroup}`}>
            <EventIcon />
            <div className='label'>
              <span>Event Dates</span>
            </div>
            <p className='instructions'>
              Specify the date your event will begin and end. This date must be
              at least XXX days after you’ve completed Registration.
            </p>
            <div className='fields-group'>
              <div>
                <input
                  id='eventStartDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 14, 2022'
                  required
                />
                <label htmlFor='eventStartDate'>Event Start Date</label>
              </div>
              <div>
                <input
                  id='eventStartDate'
                  type='text'
                  autoComplete='name'
                  placeholder='4:00 PM'
                  required
                />
                <label htmlFor='eventStartDate'>Event Start Time</label>
              </div>
              <div>
                <input
                  id='eventEndDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 18, 2022'
                  required
                />
                <label htmlFor='eventEndDate'>Event End Date</label>
              </div>
            </div>
          </div>

          <div className={`${formStyles.formGroup}`}>
            <RegIcon />
            <div className='label'>
              <span>Registration Dates</span>
            </div>
            <p className='instructions'>
              Specify dates your event will be open for registration.
              Registration will automatically close when the maximum number of
              confirmed teams is reached.
            </p>
            <div className='fields-group'>
              <div>
                <input
                  id='eventStartDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 14, 2022'
                  required
                />
                <label htmlFor='eventStartDate'>Event Start Date</label>
              </div>
              <div>
                <input
                  id='eventEndDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 18, 2022'
                  required
                />
                <label htmlFor='eventEndDate'>Event End Date</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
