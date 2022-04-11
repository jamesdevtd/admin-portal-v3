import React from 'react';

import styles from './SeriesCheckboxes.module.scss';

import { seriesNames } from '../data/seriesNames';

interface CheckBoxGroupProps {
    heading: string;
    items: string[];
}

const defaultProps: CheckBoxGroupProps = {
    heading: 'Additional Events',
    items: seriesNames
}


export default function SeriesCheckboxes({ heading, items }: CheckBoxGroupProps) {
    return (
        <div className={`${styles.seriesCheckBoxes}`}>
            <h3>{heading}</h3>
            <div className="checkboxes">
                {items.map((item, i) => (
                    <div className={`form-check ${i<=3 ? 'disabled' : ''}`} key={i} >
                        <input value={i} className="form-check-input" type="checkbox" id={`check-${i}`} 
                            disabled={i<=3 ? true : false}
                        />
                        <label className="form-check-labe" htmlFor={`check-${i}`}>
                            {item}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

SeriesCheckboxes.defaultProps = defaultProps;