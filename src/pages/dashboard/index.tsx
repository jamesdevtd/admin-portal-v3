import { useEffect } from 'react';

import styles from '@/pages/dashboard/style.module.scss';

import Header from '@/components/Header';
import Layout from '@/components/layout/Layout';

import { menuItems } from '../../mock-data/menu-items.js';

import Icon1 from '~/icons/nav-icon.svg';
import TagxLogoWhite from '~/svg/tagx-logo-white.svg';

export default function Dashboard() {
  useEffect(() => {
    console.log(menuItems);
    // return () => {
    //   second
    // }
  }, []);

  return (
    <Layout>
      <div className={`${styles.dashboard}`}>
        <img
          src='/images/backgrounds/dashboard-bg-cone.png'
          alt='affiliate signup background'
          className='bg'
        />
        <div className='sidebar relative h-60 md:h-screen'>
          <TagxLogoWhite className='logo' />
          <div className='nav'>
            <h3>TX Affiliate</h3>
            <ul>
              <li>
                <Icon1 />
                <span>Dashboard</span>
              </li>
            </ul>
            <h3>General</h3>
            <ul>
              <li>
                <Icon1 />
                <span>Events</span>
              </li>
              <li>
                <Icon1 />
                <span>Reports</span>
              </li>
              <li>
                <Icon1 />
                <span>Settings</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='content'>
          <Header />
          <div className='content-wrap'>
            <div className='m-auto flex w-full flex-col gap-5'>
              <section className='my-40 flex flex-col items-center'>
                <h3 className='text-lg'>
                  Affiliate Dashboard content goes here...
                </h3>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
