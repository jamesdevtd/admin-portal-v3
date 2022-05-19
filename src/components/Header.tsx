import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';

import BellIcon from '~/icons/bell.svg';


export default function Header() {
  const [userFullName, setUserFullName] = useState('');
  const [userInitials, setUserInitials] = useState('G');

  function logoutHandler() {
    signOut();
  }

  const getInitials = (fullName: string) => {
    const allNames = fullName.trim().split(' ');
    const initials = allNames.reduce((acc, curr, index) => {
      if (index === 0 || index === allNames.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, '');
    return initials;
  }

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        setUserFullName('Guest');
      } else {
        setUserFullName(`${session?.user?.name}`);
      }
    });
  }, []);

  useEffect(() => {
    setUserInitials(getInitials(userFullName));
  }, [userFullName])


  return (
    <header className={`${styles.header}`}>
      <div className='wrap'>
        <div className='search-input'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input type='text' name='name' placeholder='Search' className='' />
        </div>
        <nav className='ml-auto mr-0 block'>
          <ul className='flex flex-row items-center justify-between space-x-4'>
            <button>
              <BellIcon />
            </button>
            <div className="m-1 mr-2 w-7 h-7 relative flex justify-center items-center rounded-full bg-red-500 border-2 border-white text-sm text-white uppercase">
              {userInitials}
            </div>
            <button onClick={logoutHandler}>
              <span className='user-name'>{userFullName}</span>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
