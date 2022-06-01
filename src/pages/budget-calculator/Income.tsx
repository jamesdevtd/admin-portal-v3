import React from 'react'

import styles from './BudgetCalculator.module.scss'

export default function Income() {
  return (
    <div className={styles.fields}>
      <div className="field">
        <label># of Competitions</label>
        <input type="number" defaultValue={1} />
      </div>
      <div className="field">
        <label># of Players per Team</label>
        <input type="number" value={10} readOnly />
      </div>
      <div className="field">
        <label># of Divisions per Series</label>
        <input type="number" defaultValue={2} />
      </div>
      <div className="field">
        <label>4 Teams per Division</label>
        <input type="number" defaultValue={8} />
      </div>
      <div className="field">
        <label>4 Teams per Division</label>
        <input type="number" defaultValue={8} />
      </div>
      <div className="field">
        <label>6 Teams per Division</label>
        <input type="number" defaultValue={8} />
      </div>
      <div className="field">
        <label>8 Teams per Division</label>
        <input type="number" defaultValue={8} />
      </div>
      <div className="field">
        <label># of Series per Year</label>
        <input type="number" defaultValue={6} />
      </div>
      <div className="field divider">
        <span>Base Income</span>
      </div>
      <div className="field">
        <label>Cost per Player </label>
        <input type="text" value="$55.00" readOnly />
      </div>
      <div className="field">
        <label>Total Base Income per Team</label>
        <input type="text" defaultValue="$550.00" readOnly />
      </div>
      <div className="field total">
        <label>Total Income per Series</label>
        <input type="text" defaultValue="$13,200.00" readOnly />
      </div>
      <div className="field total">
        <label>Total Income per Year</label>
        <input type="text" defaultValue="$79,200.00" readOnly />
      </div>
    </div>
  )
}
