import React, { useEffect, useState } from 'react';

import styles from './DivisionCreator.module.scss';

import DivisionForm from './DivisionForm';

import DvisionProps from '@/types/division';

import PlusIcon from '~/icons/blue/plus.svg';



type Props = {
  items: DvisionProps[];
  handleAddDivision: (val: DvisionProps) => void
};

export default function DivisionCreator({ items, handleAddDivision }: Props) {
  const [showBlankForm, setShowBlankForm] = useState(false);

  useEffect(() => {
    console.log('Division items: ', items);
  }, [items]);


  const removeForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('removeForm:');
    setShowBlankForm(false);
  };

  return (
    <div className={`${styles.divisionCreator}`}>
      {(items.length > 0) &&
        <div className="items">
          <h4>items here....</h4>
        </div>
      }
      {showBlankForm &&
        <DivisionForm handleAddDivision={handleAddDivision} removeForm={removeForm} />
      }
      <div className='add-new' onClick={(e) => {
        e.preventDefault();
        setShowBlankForm(true);
      }}>
        <span>Add New Division</span>
        <PlusIcon />
      </div>
    </div>
  );
}