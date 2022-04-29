import React, { useState } from 'react'

import styles from './Divisions.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { useAppSelector } from '@/app/hooks';
import { getDivsionById } from '@/features/eventCreationSteps/divisionsSlice';
import { priceRegExp } from '@/utils/regex';


type Props = {
  divisionId: number
}

export default function PlayerFeeEditor({ divisionId }: Props) {
  const division = useAppSelector(getDivsionById(divisionId));
  const divisionName = `${division?.divisionType} ${division?.makeUp} ${division?.competitionLevel}`;
  const item = useAppSelector(getDivsionById(divisionId))?.playerFee;

  const defaultFee = (item?.isFree) ? '' : '0';
  const [isFree, setIsFree] = useState(item?.isFree);
  const [fee, setFee] = useState(defaultFee);

  console.log(`PlayerFeeEditor for ${divisionId}:`, division);

  return (
    <div className={`${fieldStyles.fieldsGroup} ${styles.playerFee} ${division?.divisionType ? '' : 'hide'}`}>
      <div className="col">
        <h3>{divisionId}. {divisionName}</h3>
        <span className="label">Division</span>
      </div>
      <div className="col">
        <div className="vertical-check" >
          <input type='checkbox'
            onChange={(e) => {
              const val = e.target.checked;
              setIsFree(val);
            }}
          />
          <label> Free * </label>
        </div>
      </div>
      <div className="col">
        <div className="price-input" >
          <span className="currency">$</span>
          <input type='number'
            value={isFree ? '0' : fee}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || priceRegExp.test(val))
                setFee(val);
              // setFee(cleanNumber(val));
            }}
          />
        </div>
      </div>
    </div>
  )
}