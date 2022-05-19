import React from 'react'

import styles from './BudgetCalculator.module.scss'

export default function Revenue() {
  return (
    <div className={`${styles.fields} ${styles['revenue']}`}>
      <div className="field blue">
        <label>Total Profit (per Series)</label>
        <div className="amount">
          <span className="currency">$</span>
          <span className="value">7,305.23</span>
        </div>
      </div>
      <div className="field green">
        <h3>Total Profit <small>Per Year</small></h3>
        <div className="amount">
          <span className="currency">$</span>
          <span className="value">43,831.41</span>
        </div>
      </div>
      <div className="field blue">
        <label>Total Profit (per Tean)</label>
        <div className="amount">
          <span className="currency">$</span>
          <span className="value">304.38</span>
        </div>
      </div>

    </div>
  )
}
