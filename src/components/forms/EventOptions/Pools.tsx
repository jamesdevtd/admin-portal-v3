import React from 'react';

import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { divisionNumberOfTeams } from '@/mock-data/divisionTypes';

import { PoolItemProps } from '@/types/division';

type Props = {
  pools: PoolItemProps[],
  setPoolItems: React.Dispatch<React.SetStateAction<PoolItemProps[]>>
}

export default function Pools({ pools, setPoolItems }: Props) {
  return (
    <div className="items pool-items">
      {pools.map((item, i) =>
        <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`} key={i}>
          <div className='col'>
            <input
              type='text'
              onChange={(e) => {
                const val = e.target.value;
                console.log('changed pool name ' + i + ' : ' + val);
              }}
            />
            <label>Pool Name</label>
          </div>
          <div className='col'>
            <select >
              {divisionNumberOfTeams.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })}
            </select>
            <label># of Teams</label>
          </div>
        </div>
      )}
    </div>
  );
}