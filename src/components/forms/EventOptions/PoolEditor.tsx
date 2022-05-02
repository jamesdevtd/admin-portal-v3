import React, { useEffect, useState } from 'react';

import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getDivisionStatusById, getPoolbyParentAndId, updatePool } from '@/features/eventCreation/divisionsSlice';
import { divisionNumberOfTeams } from '@/static/division';
import { useDebounce } from '@/utils/customHooks';

import { PoolItemProps } from '@/types/division';



type Props = {
  divisionId: number,
  poolId: number,
}

export default function PoolEditor({ divisionId, poolId, }: Props) {

  const dispatch = useAppDispatch();
  const itemData: PoolItemProps | any = useAppSelector(getPoolbyParentAndId(divisionId, poolId));
  const isValidated = useAppSelector(getDivisionStatusById(divisionId));
  // console.log('poolId: ', poolId);
  // console.log('itemData: ', itemData);

  const [name, setName] = useState<string>(itemData?.name || ('Pool ' + poolId));
  const debouncedValue = useDebounce<string>(name, 500);

  const handlChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
  }

  useEffect(() => {
    dispatch(updatePool({
      divId: divisionId,
      poolIndex: itemData?.id - 1,
      poolName: debouncedValue,
      poolTeamCount: itemData?.numberOfTeams
    }));

  }, [debouncedValue]);


  return (
    <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
      <div className='col'>
        <input
          value={name}
          onChange={handlChangeName}
        />
        {name ?
          <label>Pool Name</label> :
          <span className='error'>Pool Name is required</span>
        }
      </div>
      <div className='col'>
        <select
          value={itemData?.numberOfTeams}
          onChange={(e) => {
            const val = e.target.value;
            dispatch(updatePool({
              divId: divisionId,
              poolIndex: itemData?.id - 1,
              poolName: itemData?.name,
              poolTeamCount: Number(val)
            }));
          }}
        >
          {divisionNumberOfTeams.map((item, i) => {
            return <option key={i} value={item}>{item}</option>
          })}
        </select>
        <label># of Teams</label>
      </div>
    </div>
  );
}