import React, { useEffect, useState } from 'react';

import styles from './SeriesCheckboxes.module.scss';

import SeriesProps from '@/types/series'

interface Props {
  heading: string;
  items: SeriesProps[];
  seriesMonth: number;
}

// Optional props
interface OptionalProps {
  handleAdditionalEvents: (val: SeriesProps[]) => void;
}

interface SeriesCheckboxesProps extends Props, OptionalProps { }

const defaultProps: Props = {
  heading: 'Additional Events',
  items: [],
  seriesMonth: 1
};

export default function SeriesCheckboxes({ heading, items, seriesMonth, handleAdditionalEvents }: SeriesCheckboxesProps) {
  const [checkedItems, setCheckedItems] = useState<SeriesProps[]>([]);

  useEffect(() => {
    handleAdditionalEvents(checkedItems);
  });

  useEffect(() => {
    // TODO: add Clear all button as option after select all is clicked?
    clearCheckedItems();
  }, [seriesMonth]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.getAttribute('data-checked');
    const isItemChecked = val ? !!parseInt(val) : !!false;
    if (isItemChecked) {
      const updatedItems = checkedItems.filter(item => item.month !== parseInt(e.target.value));
      setCheckedItems(updatedItems);
    } else {
      setCheckedItems([...checkedItems, { month: parseInt(e.target.value), name: e.target.name }]);
    }
  };

  const clearCheckedItems = () => {
    setCheckedItems([]);
  };

  const handleCheckAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const checkedAllItems = items.filter(item => item.month > seriesMonth);
    setCheckedItems(checkedAllItems);
  };


  return (
    <div className={`${styles.seriesCheckBoxes}`}>
      <h3>{heading}</h3>
      <div className='checkboxes'>
        {items.map((item) => {
          const isChecked = (checkedItems.find(i => i.month === item.month))
            && (item.month > seriesMonth)
            ? true : false;
          return (
            <div
              className={`form-check ${(item.month <= seriesMonth) ? 'disabled' : ''}`}
              key={item.month}
            >
              <input
                value={item.month}
                name={item.name}
                className={`form-check-input ${isChecked ? 'checked' : 'unchecked'}`}
                type='checkbox'
                data-checked={isChecked ? 1 : 0}
                id={`check-${item.month}`}
                disabled={(item.month <= seriesMonth) ? true : false}
                onChange={handleCheck}
                checked={isChecked}
              />
              <label className='form-check-label' htmlFor={`check-${item.month}`}>
                {item.name}
              </label>
            </div>
          )
        })}

      </div>
      <button className='btn' onClick={handleCheckAll}>
        Select All
      </button>
    </div>
  );
}

SeriesCheckboxes.defaultProps = defaultProps;
