import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getDivisions, updateDivision } from '@/features/eventCreationSteps/divisionsSlice';
import { divisionNumberOfTeams } from '@/static/divisionTypes';
import { useDebounce } from '@/utils/customHooks';

import { PoolItemProps } from '@/types/division';

const schema = yup
  .object({
    name: yup.string().required(),
    numberOfTeams: yup.number().positive()
  })
  .required();

type Props = {
  divisionId: number,
  itemData: PoolItemProps,
}

export default function PoolEditor({ itemData, divisionId }: Props) {

  const dispatch = useAppDispatch();
  const divisions = useAppSelector(getDivisions);
  const item = divisions.find(i => i.id === divisionId);

  const [name, setName] = useState<string>(itemData.name);
  const [teamCount, setTeamCount] = useState<number>(itemData.numberOfTeams);

  const debouncedPoolName: string = useDebounce<string>(name, 400);

  const defaultValues = {
    name: itemData.name,
    numberOfTeams: itemData.numberOfTeams
  }

  const {
    register,
    watch,
    getValues,
    setValue,
    trigger,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  });

  useEffect(() => {
    console.log('debouncedPoolName: ', debouncedPoolName);
    console.log('name: ', name);

    if (debouncedPoolName) {
      console.log('debounced: ', debouncedPoolName);
      savePool();
      if (formState.isValid) {
        if (item?.pools) {
          const slicedPool = item.pools.filter(i => i.id !== itemData.id);
          const updatedItem = {
            id: itemData.id,
            name: name,
            numberOfTeams: teamCount,
          }
          const updatedPools = [...slicedPool, updatedItem];

          const payload = {
            id: item.id,
            divisionType: item.divisionType,
            makeUp: item.makeUp,
            competitionLevel: item.competitionLevel,
            numberOfPools: item.numberOfPools,
            isEdited: true,
            isValidated: false,
            pools: updatedPools,
          };
          console.log('payload:', payload);
          dispatch(updateDivision(payload));
        }
      }
    } else {
      console.log('no deBounce yet');
    }
    trigger();
  }, [debouncedPoolName]);

  const savePool = () => {
    trigger();
    setValue('numberOfTeams', teamCount);
  }

  useEffect(() => {


  }, [formState.isValid]);

  return (
    <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
      <div className='col'>
        <input
          value={name}
          {...register('name')}
          onChange={(e) => {
            const val = e.target.value;
            setValue('name', val);
            setName(val);
          }}
        />
        {formState.errors.name ?
          <span className='error'>Pool Name is required</span> :
          <label>Pool Name</label>
        }
      </div>
      <div className='col'>
        <select
          {...register('numberOfTeams')}
          value={teamCount}
          onChange={(e) => {
            const val = e.target.value;
            setTeamCount(Number(val));
            console.log('changed number of teams: ' + val);
            console.log('update a pool.numberOfTeams in division ID: ', divisionId);
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