import * as React from 'react';

import styles from './Header.module.scss';

import BellIcon from '~/icons/nav-icon.svg';

export default function Header() {
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
          <input type='text' name='name' placeholder='search' className='' />
        </div>
        <nav className='ml-auto mr-0 block'>
          <ul className='flex flex-row items-center justify-between space-x-4'>
            <button>
              <BellIcon />
            </button>
            <button>
              <BellIcon />
            </button>
            <button>
              <span className='text-sm font-semibold'>Sean P</span>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
