import { useState } from 'react';

import styles from './TxFees.module.scss'

import ContentWrap from "@/components/layout/ContentWrap";
import Layout from "@/components/layout/Layout";

import Expenses from "./Expenses";
import Income from "./Income";

import AffiliateFeeIcon from '~/svg/affiliate-fee.svg';
import LockIcon from '~/svg/lock.svg';
import SearchIcon from '~/svg/search-icon.svg';

export default function TxFees() {
  const [search, setSearch] = useState<string>('');
  return (
    <Layout>
      <ContentWrap className={styles.TxFees}>
        <header className="content-header">
          <AffiliateFeeIcon />
          <h2>Tagx Fees</h2>
          <div className='flex items-center ml-auto w-80'>
            <label className="relative block rounded-md w-full">
              <span className="sr-only">Search</span>
              <input onChange={(e) => setSearch(e.target.value)} className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-3 pr-9 shadow-sm focus:outline-none focus:border-blue-brand focus:ring-blue-brand focus:ring-1 sm:text-sm" placeholder="Search for a transaction here" type="text" name='search' />
              <button className="absolute inset-y-0 right-0 flex items-center px-3 m-0.5 rounded-md bg-blue-brand hover:bg-blue-start" type='button'>
                <SearchIcon className="h-4 w-5 fill-slate-300" />
              </button>
            </label>
          </div>
        </header>

        <div className="top-total">
          <div className='flex justify-between w-full px-8'>
            <div>
              <h3>Your TagX Fees</h3>
              <span className='flex items-baseline'>
                <LockIcon />
                Your Locked TagX Fees
              </span>
            </div>
            <div className='grid grid-flow-col auto-cols-max border-between'>
              <div className='pr-8 pl-2'>
                <div>License Date</div>
                <div className='text-blue-brand'>09/14/2021</div>
              </div>
              <div className='pr-8 pl-2'>
                <div>TagX Account Lead</div>
                <div className='text-blue-brand'>Tommy Tagsalot</div>
              </div>
              <div className='pr-8 pl-2'>
                <div>Next Gear Renewal</div>
                <div className='text-blue-brand'>09/10/2022</div>
              </div>
              <div className='pr-8 pl-2'>
                <div>Referral Contact</div>
                <div className='text-blue-brand'>Ronan O&apos;Gara</div>
              </div>
            </div>
          </div>
        </div>

        <div className="categories">
          <button className="capsule active">Open</button>
          <button className="capsule orange">Pro</button>
          <button className="capsule peach">WCQ</button>
          <button className="capsule blue">WC</button>
        </div>

        <div className="table">
          <div className="row heading">
            <div className="col">Platform Fee Per Division | Adult Competitive</div>
            <div className="col">Platform Fee Per Division | Youth & Emerging</div>
          </div>
          <div className="row">
            <div className="col">
              <Income />
            </div>
            <div className="col">
              <Expenses />
            </div>
          </div>
        </div>
      </ContentWrap>
    </Layout>
  );
}