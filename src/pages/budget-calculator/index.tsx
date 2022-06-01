import React from 'react'

import styles from './BudgetCalculator.module.scss'

import ContentWrap from '@/components/layout/ContentWrap'
import Layout from '@/components/layout/Layout'

import Expenses from './Expenses';
import Income from './Income';
import Revenue from './Revenue';

import CalculatorIcon from '~/icons/blue/calculator.svg';
import TotalArrow from '~/svg/total-arrow.svg';

export default function BudgetCalculator() {
  return (
    <Layout>
      <ContentWrap className={styles.BudgetCalculator}>

        <header className="content-header">
          <CalculatorIcon />
          <h2>Budget Calculator</h2>
          <span className="capsule gray small">USD</span>
        </header>

        <div className="top-total">
          <TotalArrow />
          <h3 >Total Profit Per Year</h3>
          <div className="amount">
            <span className='currency'>$</span>
            <span className="value">43,831.41</span>
          </div>
        </div>

        <div className="categories">
          <button className="capsule active">Open</button>
          <button className="capsule orange">Pro</button>
          <button className="capsule peach">WCQ</button>
          <button className="capsule blue">WC</button>
        </div>

        <div className="tab-nav">
          <button className='active'>Adult Income</button>
          <button>Youth Income</button>
          <button>Emerging Youth Income</button>
          <button>Additional Income</button>
        </div>
        <div className="table">

          <div className="row heading">
            <div className="col">Income</div>
            <div className="col">Expenses</div>
            <div className="col">Revenue</div>
          </div>
          <div className="row">
            <div className="col">
              <Income />
            </div>
            <div className="col">
              <Expenses />
            </div>
            <div className="col">
              <Revenue />
            </div>
          </div>

          <hr />
          <p className="disclaimer">
            Disclaimer: This Calculator should only be used as a guide and not considered an exact representation of earnings.
          </p>
        </div>


      </ContentWrap>
    </Layout>
  )
}