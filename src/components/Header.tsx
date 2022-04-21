import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';

import BellIcon from '~/icons/bell.svg';
import UserInitials from '~/icons/user-init.svg';


export default function Header() {
  const [username, setUsername] = useState('');
  
  function logoutHandler() {
    signOut();
  }

  useEffect(() => {
    getSession().then(session => {
      if(!session) {
        setUsername('Guest');  
      } else {
        setUsername('Sean Paul');  
      }
    });  
  }, []);
  
  
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
            <button>
              <UserInitials />
            </button>
            <button onClick={logoutHandler}>
              <span className='user-name'>{username}</span>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
