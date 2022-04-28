import React from 'react';

import { useAppSelector } from '@/app/hooks';
import { getDivisions } from '@/features/eventCreationSteps/divisionsSlice';

import PoolEditor from './PoolEditor';


type Props = {
  divisionId: number
}

export default function Pools({ divisionId }: Props) {

  const divisions = useAppSelector(getDivisions);
  const item = divisions.find(i => i.id === divisionId);

  return (
    <div className="items pool-items togglelable">
      {item?.pools &&
        item.pools.map((item) =>
          <PoolEditor
            key={item.id}
            itemData={item}
            divisionId={divisionId}
          />
        )}
    </div>
  );
}