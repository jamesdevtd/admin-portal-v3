import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from '@/components/layout/Dashboard.module.scss';

import Header from '@/components/Header';

import mockMenuItems from '@/mock-data/menuItems';

import BottomWhiteCurve from '~/svg/bottom-white-curve.svg';
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

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const Layout = (props: Props) => {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  useEffect(() => {
    setMenuItems(mockMenuItems);
  }, []);

  return (
    <div className={`${styles.dashboardLayout} default-layout`}>

      <div className='wall-bg wall-blue-gradient'>
        <BottomWhiteCurve />
      </div>
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

          {props.children}

        </div>
      </div>

    </div>
  );
};

export default Layout;
