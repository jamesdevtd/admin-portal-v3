import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from '@/pages/dashboard/events/style.module.scss';

import { mockMenuItems } from '../../../mock-data/events-menu-items';

import CalendarIcon from '~/icons/blue/calendar.svg';
import WarningIcon from '~/icons/blue/warning.svg';

interface MenuSubItems {
  icon: string;
  label: string;
  url: string;
}
interface MenuItems {
  heading: string;
  items: MenuSubItems[];
}

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
                <div className='menu-group' key={i}>
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
          <div className='form-group'>
            <WarningIcon />
            <div className='label'>
              <div className='icon-box warning'></div>
              <span>General</span>
            </div>
            <p className='instructions'>
              Name your event. Ex: An Example Name. Select the Series (Open 1 -
              January, Open 2 - February, etc.).
            </p>
          </div>
          <div className='form-group'>
            <WarningIcon />
            <div className='label'>
              <div className='icon-box dates'></div>
              <span>Event Dates</span>
            </div>
            <p className='instructions'>
              Name your event. Ex: An Example Name. Select the Series (Open 1 -
              January, Open 2 - February, etc.).
            </p>
          </div>
          <div className='form-group'>
            <WarningIcon />
            <div className='label'>
              <div className='icon-box registration'></div>
              <span>Registration Dates</span>
            </div>
            <p className='instructions'>
              Name your event. Ex: An Example Name. Select the Series (Open 1 -
              January, Open 2 - February, etc.).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
