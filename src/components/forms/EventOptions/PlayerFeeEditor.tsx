import React from 'react'

import styles from './Divisions.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { useAppSelector } from '@/app/hooks';
import { getDivisions } from '@/features/eventCreationSteps/divisionsSlice';

import { PlayerFeeItemProps } from '@/types/division';

type Props = {
  divisionId: number,
  itemData?: PlayerFeeItemProps,
}

export default function PlayerFeeEditor({ itemData, divisionId }: Props) {

  const divisions = useAppSelector(getDivisions);
  const item = divisions.find(i => i.id === divisionId);

  return (
    <div className={`${fieldStyles.fieldsGroup} ${styles.playerFee} ${item?.divisionType ? '' : 'hide'}`}>
      <div className="col">
        <h3>{divisionId}. {item?.divisionType} {item?.makeUp} {item?.competitionLevel}</h3>
        <span className="label">Division</span>
      </div>
      <div className="col">
        <div className="vertical-check" >
          <input type='checkbox' />
          <label> Free * </label>
        </div>
      </div>
      <div className="col">
        <div className="price-input" >
          <span className="currency">$</span>
          <input type='number' step='0.01' />
          <label>Fee</label>
        </div>
      </div>
    </div>
  )
}