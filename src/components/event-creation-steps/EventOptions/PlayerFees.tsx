import React, { useEffect, useState } from 'react';

import { useAppSelector } from '@/app/hooks';
import { getDivisions } from '@/features/eventCreation/divisionsSlice';

import PlayerFeeEditor from './PlayerFeeEditor';



export default function PlayerFees() {

  const divisions = useAppSelector(getDivisions);
  const [showFees, setShowFees] = useState(false);

  useEffect(() => {
    divisions.map((item) => {
      if (item.divisionType) {
        setShowFees(true);
        return;
      }
    });
  }, [divisions])

  return (
    <>
      {showFees ?
        <div className="fee-items">
          {divisions &&
            divisions.map((item) => item.divisionType &&
              <PlayerFeeEditor
                key={item.id}
                divisionId={item.id}
              />
            )
          }
        </div> :
        <div className='center-note'>Please create a Division - once created, Division Entry Fee options will be displayed here</div>
      }
    </>
  );
}