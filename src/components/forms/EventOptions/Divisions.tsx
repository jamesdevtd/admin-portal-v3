import React, { useState } from 'react';

import styles from './Divisions.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { useAppSelector } from '@/app/hooks';
import { addDivision, getDivisions } from '@/features/eventCreationSteps/divisionsSlice';

import { DivisionEditor } from './DivisionEditor';

import { DivisionProps } from '@/types/division';

import PlusIcon from '~/icons/blue/plus.svg';


export default function Divisions() {
  const dispatch = useAppDispatch();
  const divisions = useAppSelector(getDivisions);
  // const { divisions, updateDivision, addDivision } = React.useContext(DivisionContext) as DivisionContextType;
  const [showAddButton, setShowBlankForm] = useState(false);

  const starterDivision: DivisionProps = {
    id: divisions.length + 1,
    divisionType: '',
    makeUp: '',
    competitionLevel: '',
    numberOfPools: 1,
    playerFee: {
      divisionId: divisions.length + 1,
      isFree: false,
      fee: null,
    },
    pools: [{
      id: 1,
      name: 'Pool 1',
      numberOfTeams: 8
    }],
    isEdited: false,
    isValidated: false,
  };

  return (
    <div className={styles.divisions}>
      {divisions &&
        <div className="items">
          {divisions.map((item) =>
            <div className="item" key={item.id}>
              <DivisionEditor
                divisionId={item.id}
              />
            </div>
          )}
        </div>
      }
      <div className='add-new' onClick={(e) => {
        e.preventDefault();
        dispatch(addDivision(starterDivision));
      }}>
        <span>Add New Division</span>
        <PlusIcon />
      </div>
    </div>
  );
}