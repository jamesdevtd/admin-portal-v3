import React, { useState } from 'react';

import styles from './Divisions.module.scss';

import DivisionEditor from './DivisionEditor';

import { DivisionProps } from '@/types/division';

import PlusIcon from '~/icons/blue/plus.svg';



type Props = {
  items: DivisionProps[];
  handleAddDivisionItem: (val: DivisionProps) => void;
  handleRemoveDivisionItem: (val: DivisionProps) => void
  handleUpdateDivisionItem: (val: DivisionProps) => void
};

export default function Divisions({
  items,
  handleAddDivisionItem,
  handleRemoveDivisionItem,
  handleUpdateDivisionItem
}: Props) {
  const [showBlankForm, setShowBlankForm] = useState(false);

  return (
    <div className={`${styles.divisions}`}>
      {(items.length > 0) &&
        <div className="items">
          {items.map(item =>
            <div className="item" key={item.id}>
              <DivisionEditor
                itemData={item}
                updateItem={handleUpdateDivisionItem}
                removeItem={handleRemoveDivisionItem}
                itemsLength={items.length}
                addItem={handleAddDivisionItem} />
            </div>
          )}
        </div>
      }
      {showBlankForm ?
        <DivisionEditor
          itemsLength={items.length}
          addItem={handleAddDivisionItem}
          setShowBlankForm={setShowBlankForm}
        /> :
        <div className='add-new' onClick={(e) => {
          e.preventDefault();
          setShowBlankForm(true);
        }}>
          <span>Add New Division</span>
          <PlusIcon />
        </div>
      }
    </div>
  );
}