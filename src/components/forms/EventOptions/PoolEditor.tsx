import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getDivisions, getPoolbyParentAndId } from '@/features/eventCreationSteps/divisionsSlice';
import { divisionNumberOfTeams } from '@/static/divisionTypes';

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

  const poolData = useAppSelector(getPoolbyParentAndId(divisionId, itemData.id));

  const [name, setName] = useState<string>(itemData.name);
  const [numberOfTeams, setNumberOfTeams] = useState<number>(itemData.numberOfTeams);

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

  // console.log('Render: ' + name + ' | ' + numberOfTeams);

  return (
    <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
      <div className='col'>
        <input
          // value={name}
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
          // value={numberOfTeams}
          onChange={(e) => {
            const val = e.target.value;
            setNumberOfTeams(Number(val));
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