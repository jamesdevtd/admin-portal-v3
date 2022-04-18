import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import styles from "./Events.module.scss";

import { BasicInfo } from '@/components/forms/BasicInfo';
import Header from '@/components/Header';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import mockMenuItems from '@/mock-data/menuItems';

import EventsMenu from './EventsMenu';
import SubmitButton from '../SubmitButton';

import CalendarIcon from '~/icons/blue/calendar.svg';
import TagxLogoWhite from '~/svg/tagx-logo-white.svg';

interface MenuSubItems {
  icon: string;
  label: string;
  url: string;
}
interface MenuItems {
  heading: string;
  items: MenuSubItems[];
}

export default function Dashboard() {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const eventFormRef = useRef<any>();

  useEffect(() => {
    setMenuItems(mockMenuItems);
  }, []);

  const submitEventsForm = () => {
    if (eventFormRef && eventFormRef.current) {
      eventFormRef.current.submitForm();
    }
  };

  return (
    <Layout layoutName='dashboard'>
      <div
        className={`sidebar ${sidebarCollapse ? 'collapsed' : 'expanded'} 
         outer`}
      >
        <TagxLogoWhite className='logo' />
        <div className='nav'>
          {menuItems &&
            menuItems.map((group, i) => (
              <div className='menu-group' key={i}>
                <h3>{group.heading}</h3>
                <ul>
                  {group.items &&
                    group.items.map((item, i) => (
                      <li
                        key={i}
                        className={`${item.label === 'Events' ? 'current' : ''
                          }`}
                      >
                        <Link href={item.url}>
                          <a>
                            <div className={`icon-box ${item.icon}`}></div>
                            <span>{item.label}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          <button onClick={() => setSidebarCollapse(!sidebarCollapse)}>
            <div className='icon-box collapse-toggle'></div>
            <span className='sr-only'></span>
          </button>
        </div>
      </div>
      <div className={`content ${sidebarCollapse ? 'collapsed' : 'expanded'}`}>
        <Header />

        <div className='content-wrap'>

          <div className={styles.Events}>

            <header className='content-header'>
              <CalendarIcon />
              <h2>New Open Series</h2>
              <button className='btn draft'>Draft</button>
              <button className='btn ml-auto'>Cancel</button>
            </header>

            <div className='content-main'>
              <div className='inner-sidebar'>
                <EventsMenu />
              </div>

              <div className="inner-content">
                <BasicInfo ref={eventFormRef} setIsFormEdited={setIsFormEdited} />
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className={`footer-nav ${isFormEdited ? '' : 'hidden'}`}>
        <div className='wrap'>
          <ButtonLink variant='grey' href='/dashboard'>
            Cancel
          </ButtonLink>
          <SubmitButton
            formId='basicInfo'
            clickHander={submitEventsForm}
            className='test-class'
          >
            Save &amp; Continue
          </SubmitButton>
        </div>
      </div>
    </Layout>
  );
}
