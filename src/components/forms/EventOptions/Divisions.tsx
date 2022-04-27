import React, { useState } from 'react';

import styles from './Divisions.module.scss';

import { useAppSelector } from '@/app/hooks';
import { getDivisions } from '@/features/eventCreationSteps/divisionsSlice';

import DivisionCreator from './DivisionCreator';
import { DivisionEditor } from './DivisionEditor';

import PlusIcon from '~/icons/blue/plus.svg';


export default function Divisions() {
  const divisions = useAppSelector(getDivisions);
  // const { divisions, updateDivision, addDivision } = React.useContext(DivisionContext) as DivisionContextType;
  const [showBlankForm, setShowBlankForm] = useState(false);

  return (
    <div className={styles.divisions}>
      {divisions &&
        <div className="items">
          {divisions.map((item) =>
            <div className="item" key={item.id}>
              <DivisionEditor
                itemData={item}
              />
            </div>
          )}
        </div>
      }
      {showBlankForm ?
        <DivisionCreator
          divisionsLength={divisions.length}
        />
        :
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