import Link from 'next/link';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

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
                        className={`${
                          item.label === 'Events' ? 'current' : ''
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
          <Events />
        </div>
      </div>
      <div className='footer-nav'>
        <div className='wrap'>
          <ButtonLink variant='grey' href='/dashboard'>
            Cancel
          </ButtonLink>
          <ButtonLink href='#'>Save &amp; Continue</ButtonLink>
        </div>
      </div>
    </Layout>
  );
}
