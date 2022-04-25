import React, { useState } from 'react';

import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { divisionNumberOfTeams } from '@/mock-data/divisionTypes';

import { PoolItemProps } from '@/types/division';

type Props = {
  itemIndex: number,
  poolItem: PoolItemProps,
  handleUpdatePool: (val: PoolItemProps) => void
}

export default function Pools({ itemIndex, poolItem, handleUpdatePool }: Props) {

  const [name, setName] = useState<string>(`Pool ${itemIndex + 1}`);
  const [teamCount, setTeamCount] = useState<number>(8);

  return (
    <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
      <div className='col'>
        <input
          type='text'
          value={name}
          onChange={(e) => {
            const val = e.target.value;
            setName(val);
            console.log('changed pool name to :', val);
          }}
        />
        <label>Pool Name</label>
      </div>
      <div className='col'>
        <select
          value={teamCount}
          onChange={(e) => {
            const val = e.target.value;
            console.log('changed number of teams: ' + val);
          }}>
          {divisionNumberOfTeams.map((item, i) => {
            return <option key={i} value={item}>{item}</option>
          })}
        </select>
        <label># of Teams</label>
      </div>
    </div>
  );
}