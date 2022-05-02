import React, { useEffect, useState } from 'react'

import styles from './Divisions.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getDivsionById, updateDivisionFee } from '@/features/eventCreation/divisionsSlice';
import useDebounce from '@/utils/customHooks';


type Props = {
  divisionId: number
}

export default function PlayerFeeEditor({ divisionId }: Props) {
  const dispatch = useAppDispatch();
  const division = useAppSelector(getDivsionById(divisionId));
  const divisionName = `${division?.divisionType} ${division?.makeUp} ${division?.competitionLevel}`;
  const item = useAppSelector(getDivsionById(divisionId))?.playerFee;

  const [isFree, setIsFree] = useState(item?.isFree || false);
  const [fee, setFee] = useState(item?.fee || '');

  const debouncedValue = useDebounce<string>(fee.toString(), 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFee(val);
    setIsFree(false);
  }

  const handleUpdateDivisionFee = () => {
    const updatedFee = {
      divisionId: divisionId,
      isFree: isFree,
      fee: isFree ? 0 : Number(fee)
    }
    const payload = {
      id: divisionId,
      playerFee: updatedFee
    };
    // console.log('payload: ', payload);
    dispatch(updateDivisionFee(payload));
  }

  useEffect(() => {
    handleUpdateDivisionFee();
  }, [debouncedValue]);

  useEffect(() => {
    handleUpdateDivisionFee();
  }, [isFree]);

  return (
    <div className={`${fieldStyles.fieldsGroup} ${styles.playerFee} ${division?.divisionType ? '' : 'hide'}`}>
      <div className="col">
        <h3>{divisionId}. {divisionName}</h3>
        <span className="label">Division</span>
      </div>
      <div className="col">
        <div className="vertical-check" >
          <input type='checkbox'
            checked={isFree}
            onChange={() => {
              setIsFree(!isFree);
            }}
          />
          <label> Free * </label>
        </div>
      </div>
      <div className="col">
        <div className="price-input" >
          <span className="currency">$</span>
          {isFree ?
            <input type='number' value='0' className='is-fee' disabled /> :
            <input type='number' onChange={handleChange} value={fee} />
          }
        </div>
      </div>
    </div>
  )
}
