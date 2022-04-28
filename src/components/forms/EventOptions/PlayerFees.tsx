import React from 'react';

import { useAppSelector } from '@/app/hooks';
import { getDivisions } from '@/features/eventCreationSteps/divisionsSlice';

import PlayerFeeEditor from './PlayerFeeEditor';



export default function PlayerFees() {

  const divisions = useAppSelector(getDivisions);

  return (
    <div className="items flex flex-col gap-3">
      {divisions &&
        // TODO: sort by ID: elems.sort((a, b) => a.id - b.id);
        divisions.map((item) => item.divisionType &&
          <PlayerFeeEditor
            key={item.id}
            divisionId={item.id}
          />
        )}
    </div>
  );
}