import React, { useState } from 'react';
import NumberFormat from "react-number-format";

import styles from './BudgetCalculator.module.scss'

export default function Income() {
  const [totalIncomeSeries, setTotalIncomeSeries] = useState(13200.00);
  const [totalIncomeYear, setTotalIncomeYear] = useState(79200.00);
  const [costPerPlayer, setCostPerPlayer] = useState(55);

  return (
    <div className={styles.fields}>
      <div className="field">
        <label># of Leagues</label>
        <input type="number" defaultValue={1} onChange={(e: any) => {
          setTotalIncomeSeries(e.target.value * 55 * 10);
          setTotalIncomeYear(e.target.value * 55 * 10 * 12);
        }} />
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
        <label># of Pools with 4 Teams</label>
        <input type="number" defaultValue={8} />
      </div>
      <div className="field">
        <label># of Pools with 6 Teams</label>
        <input type="number" defaultValue={8} />
      </div>
      <div className="field">
        <label># of Pools with 8 Teams</label>
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
        <label>Cost per Player <span className='currency'>$</span></label>
        <NumberFormat
          value={costPerPlayer}
          thousandSeparator=","
          decimalSeparator="."
          className='no-bg'
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </div>
      <div className="field">
        <label>Total Base Income per Team <span className='currency'>$</span></label>
        <NumberFormat
          value={550.00}
          thousandSeparator=","
          decimalSeparator="."
          className='gray-bg'
          decimalScale={2}
          fixedDecimalScale={true}
          readOnly
        />
      </div>
      <div className="field total">
        <label>Total Income per Series <span className='currency'>$</span></label>
        <NumberFormat
          value={totalIncomeSeries}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </div>
      <div className="field total">
        <label>Total Income per Year <span className='currency'>$</span></label>
        <NumberFormat
          value={totalIncomeYear}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </div>
    </div>
  )
}
