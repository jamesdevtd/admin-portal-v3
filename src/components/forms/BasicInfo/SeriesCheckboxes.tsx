import React, { useEffect, useState } from 'react';

import styles from './SeriesCheckboxes.module.scss';

import SeriesProps from '@/types/series'

interface Props {
  heading: string;
  items: SeriesProps[];
  seriesMonth: number
}

// Optional props
interface OptionalProps {
  handleAdditionalEvents: (val: SeriesProps[]) => void;
}

interface SeriesCheckboxesProps extends Props, OptionalProps { }

const defaultProps: Props = {
  heading: 'Additional Events',
  items: [],
  seriesMonth: 0
};

export default function SeriesCheckboxes({ heading, items, seriesMonth, handleAdditionalEvents }: SeriesCheckboxesProps) {
  const [checkedItems, setCheckedItems] = useState<SeriesProps[]>([]);

  useEffect(() => {
    handleAdditionalEvents(checkedItems);
  }, [handleAdditionalEvents, checkedItems])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.getAttribute('data-checked');
    const isItemChecked = val ? !!parseInt(val) : !!false;
    if (isItemChecked) {
      const updatedItems = checkedItems.filter(item => item.id !== parseInt(e.target.value));
      setCheckedItems(updatedItems);
    } else {
      setCheckedItems([...checkedItems, { id: parseInt(e.target.value), name: e.target.name }]);
    }
  };

  const handleCheckAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const checkedAllItems = items.filter(item => item.id > seriesMonth);
    setCheckedItems(checkedAllItems);
  };


  return (
    <div className={`${styles.seriesCheckBoxes}`}>
      <h3>{heading}</h3>
      <div className='checkboxes'>
        {items.map((item) => {
          const isChecked = (checkedItems.find(i => i.id === item.id))
            && (item.id > seriesMonth)
            ? true : false;
          return (
            <div
              className={`form-check ${(item.id <= seriesMonth) ? 'disabled' : ''}`}
              key={item.id}
            >
              <input
                value={item.id}
                name={item.name}
                className={`form-check-input ${isChecked ? 'checked' : 'unchecked'}`}
                type='checkbox'
                data-checked={isChecked ? 1 : 0}
                id={`check-${item.id}`}
                disabled={(item.id <= seriesMonth) ? true : false}
                onChange={handleCheck}
                checked={isChecked}
              />
              <label className='form-check-label' htmlFor={`check-${item.id}`}>
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
