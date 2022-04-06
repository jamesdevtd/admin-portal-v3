import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from '@/pages/dashboard/style.module.scss';

import Header from '@/components/Header';
import Layout from '@/components/layout/Layout';

import { mockMenuItems } from '../../mock-data/menu-items.js';

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
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);
  useEffect(() => {
    console.log(mockMenuItems);
    setMenuItems(mockMenuItems);
  }, []);

  return (
    <Layout>
      <div className={`${styles.dashboard}`}>
        <img
          src='/images/backgrounds/dashboard-bg-cone.png'
          alt='affiliate signup background'
          className='bg'
        />
        <div
          className={`${
            sidebarCollapse ? 'collapsed' : 'expanded'
          } sidebar relative h-60 md:h-screen`}
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
                        <li key={i}>
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
