import React from 'react'

import styles from './BudgetCalculator.module.scss'

export default function Expenses() {
  return (
    <div className={styles.fields}>
      <div className="field">
        <label># of Standard Nights (per Series)</label>
        <input type="number" defaultValue={4} readOnly />
      </div>
      <div className="field">
        <label># of Referees per Night (per Series)</label>
        <input type="number" defaultValue={8} readOnly />
      </div>
      <div className="field">
        <label>Lights/Ground Hire (per Night)</label>
        <input type="text" defaultValue="$50.00" />
      </div>
      <div className="field">
        <label>Referee Pay (per Night)</label>
        <input type="text" defaultValue="$18.00" />
      </div>
      <div className="field">
        <label>TXI Platform Fee (4 Teams per Division)</label>
        <input type="text" defaultValue="1, 188.92" readOnly />
      </div>
      <div className="field">
        <label>TXI Platform Fee (6 Teams per Division)</label>
        <input type="text" defaultValue="1, 188.92" readOnly />
      </div>
      <div className="field">
        <label>TXI Platform Fee (8 Teams per Division)</label>
        <input type="text" defaultValue="1, 188.92" readOnly />
      </div>
      <div className="field">
        <label>TXI Draw Admin Fee (per Division)</label>
        <input type="text" defaultValue="-" readOnly />
      </div>
      <div className="field">
        <label>TXI Event Creation Fee (Annual)</label>
        <input type="text" defaultValue="-" readOnly />
      </div>
      <div className="field">
        <label>Referees Pay (per Series)</label>
        <input type="text" defaultValue="$550.00" readOnly />
      </div>
      <div className="field">
        <label>Lights/Ground Hire (per Series)</label>
        <input type="number" defaultValue="8" readOnly />
      </div>
      <div className="field">
        <label>TXI Platform Fee (per Series)</label>
        <input type="number" defaultValue="6" readOnly />
      </div>
      <div className="field">
        <label>TXI Draw Admin Fee (per Series)</label>
        <input type="text" defaultValue="-" readOnly />
      </div>
      <div className="field">
        <label>TXI Event Creation Fee (per Series)</label>
        <input type="text" defaultValue="-" readOnly />
      </div>
      <div className="field">
        <label>Prizes (per Series)</label>
        <input type="text" defaultValue="-" />
      </div>
      <div className="field">
        <label>Finals BBQ (per Series)</label>
        <input type="text" defaultValue="-" />
      </div>
      <div className="field">
        <label>Total Miscellaneous (per Series)</label>
        <input type="text" defaultValue="-" />
      </div>
      <div className="field total">
        <label>Total Expenses per Series</label>
        <input type="text" defaultValue="$5,894.77" readOnly />
      </div>
      <div className="field total">
        <label>Total Income per Year</label>
        <input type="text" defaultValue="$35,368.59" readOnly />
      </div>
    </div>
  )
}
