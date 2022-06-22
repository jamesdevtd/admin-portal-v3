/* 
  Layout: Dashboard Layout
  Description: default Admin Portal dashboard layout 
  Main elements: 
    1. sidebar - portal root nagivation 
    2. header - search bar and user avatar 
    3. content - wrapper for props.children
*/


import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from '@/components/layout/Dashboard.module.scss';

import Header from '@/components/Header';

import { GET } from '@/services/rest.service';
import mockMenuItems from '@/static/menuItems';

import Loader from './Loader';

import BottomWhiteCurve from '~/svg/bottom-white-curve.svg';
import TagxLogoWhite from '~/svg/tagx-logo-white.svg';

interface MenuSubItems {
  icon: string;
  label: string;
  url: string;
  active?: boolean;
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
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    async function checkIfAffiliateSetup() {
      // TODO: need to change to league props.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await GET(`/league`, { leagueManagerId: session?.user?.id });
      if (response?.length <= 0) {
        router.push('/affiliate-setup');
      }
    }
    checkIfAffiliateSetup();
  }, [session]);

  useEffect(() => {
    setMenuItems(mockMenuItems);
  }, [router.pathname]);

  return (
    <div className={`${styles.dashboardLayout} default-layout`}>
      {!session &&
        <Loader />
      }
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
                        className={`${(router.pathname === item.url) ? 'current' : ''
                          }`}
                      >
                        <Link href={item.url}>
                          <a className={item.active ? ' ' : 'pointer-events-none opacity-50'}>
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
