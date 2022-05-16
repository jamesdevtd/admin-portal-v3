import React from 'react';

import styles from './Congratulations.module.scss';

import CopySVG from '~/icons/copy.svg';
import Flash from '~/icons/flash.svg';
import RefereeT from '~/icons/referee_tshirt.svg';
import Shield from '~/icons/shield.svg';
import HighFive from '~/svg/high-five.svg';


export const Congratulations = () => {

  return (
    <div className={styles.congratulations}>
      <div className='grid place-items-center'>
        <div className='pt-10'>
          <HighFive className="text-7xl my-10" />
        </div>
        <h2>Congrats!</h2>
        <h3>Your Event Has Been Published!</h3>
        <div className='event_url flex items-center'>Your Event URL: <a target='_blank' href='https://tagxinternational.com/events/fsdf546dsf' rel="noreferrer">tagxinternational.com/events/fsdf546dsf</a> <CopySVG /></div>
        {/* <div className='border_b'>What Happens Next</div> */}
        <div className='my-5 grid place-items-center'>
          What Happens Next
          <hr />
        </div>
        <div className="w-full px-3 grid grid-cols-3 gap-1 items-start">
          <div className="w-18 grid place-items-center arrow">
            <Shield className="text-7xl my-10" />
            <div className='w-40 text-center'>
              <h3><span>1.</span> TEAMS REGISTER FOR YOUR EVENT</h3>
              <p>Here is where we describe this step in a bit more detail.</p>
            </div>
          </div>
          <div className="w-18 grid place-items-center arrow">
            <Flash className="text-7xl my-10" />
            <div className='w-40 text-center'>
              <h3><span>2.</span> YOU BUILD YOUR DRAW</h3>
              <p>Here is where we describe this step in a bit more detail.</p>
            </div>
          </div>
          <div className="w-18 grid place-items-center">
            <RefereeT className="text-7xl my-10" />
            <div className='w-40 text-center'>
              <h3><span>3.</span> SELECT &amp; ALLOCATE REFEREES</h3>
              <p>Here is where we describe this step in a bit more detail.</p>
            </div>
          </div>
        </div>
        <div className='editEventWrapper'>You can also <a href='#'>view the Live Event Page</a> or <a href='#'>Edit This Event</a></div>
      </div>
    </div>
  );
}
