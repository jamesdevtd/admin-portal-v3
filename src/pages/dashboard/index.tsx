import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from '@/pages/dashboard/style.module.scss';

import Header from '@/components/Header';
import Layout from '@/components/layout/Layout';

import Events from '@/pages/dashboard/events';

import { mockMenuItems } from '../../mock-data/menu-items';

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
          className={`${sidebarCollapse ? 'collapsed' : 'expanded'} sidebar outer relative h-60 md:h-screen`}
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
        <div className={`${sidebarCollapse ? 'collapsed' : 'expanded'} content`}>
          <Header />
          <div className='content-wrap'>
            <Events />
          </div>
        </div>
      </div>
    </Layout>
  );
}
