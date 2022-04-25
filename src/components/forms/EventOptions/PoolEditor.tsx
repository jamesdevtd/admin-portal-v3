import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import formStyles from '@/components/forms/styles/ContactForm.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import { adultLevels, adultMakeups, youthLevels, youthMakeups } from '@/mock-data/divisionTypes';

import { DivisionProps } from '@/types/division';


const schema = yup
  .object({
    divisionType: yup.string().required(),
    makeUp: yup.string().required(),
    competitionLevel: yup.string().required(),
    numberOfPools: yup.number().positive(),
    divisions: yup.array()
  })
  .required();



type Props = {
  itemsLength: number,
  itemData?: DivisionProps,
  addItem?: (val: DivisionProps) => void,
  updateItem?: (val: DivisionProps) => void,
  removeItem?: (val: DivisionProps) => void,
  setShowBlankForm?: React.Dispatch<React.SetStateAction<boolean>>,
}



export default function DivisionEditor({
  itemsLength,
  itemData,
  updateItem,
  removeItem,
  addItem,
  setShowBlankForm
}: Props) {
  const [divisionType, setDivisionType] = useState<string>('adult');
  const [makeUp, setMakeUp] = useState<string | null>(null);
  const [numberOfPools, setNumberOfPools] = useState<number>(1);

  const [expand, setExpand] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const defaultValues = {
    divisionType: itemData?.divisionType,
    makeUp: itemData?.makeUp,
    competitionLevel: itemData?.competitionLevel,
    numberOfPools: itemData?.numberOfPools,
    pools: itemData?.pools
  }

  const {
    register,
    clearErrors,
    getValues,
    setValue,
    trigger,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: defaultValues
  });

  const handleSaveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    trigger();
    if (formState.isValid && updateItem && itemData) {
      const updatedData = { ...getValues(), id: itemData?.id };
      console.log('handleSaveItem:, ', updatedData);
      // updateItem(updatedData);
      // setIsEdited(false);
    }
  };

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    trigger();
    console.log('handleAddItem trigger:, ', getValues());
  };

  useEffect(() => {
    // add item after validation from handleAddItem
    if (formState.isValid && addItem && setShowBlankForm) {
      const data = { ...getValues(), id: ++itemsLength };
      addItem(data);
      setShowBlankForm(false);
      console.log('useEffect added item...');

    }
  }, [formState]);


  useEffect(() => {
    if (divisionType === 'youth') {
      setValue('makeUp', 'boys');
      setValue('competitionLevel', '8 and under');
    } else {
      setValue('makeUp', "mens");
      setValue('competitionLevel', 'competitive');
    }
  }, [divisionType]);

  useEffect(() => {
    if (numberOfPools) {
      setValue('numberOfPools', 1);
    }
  }, [numberOfPools]);


  return (
    <div className={`${formStyles.contactForm} `} >
      <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
        <div className='col'>
          <input
            type='text' {...register('poolName')}
            onChange={(e) => {
              setFirstName(e.target.value);
              setIsEdited(true);
              clearErrors('firstName');
            }}
          />
          {formState.errors.firstName ?
            <span className='error'>First Name is required</span> :
            <label>First Name <span className='req'>*</span></label>
          }
        </div>
        <div className='col'>
          <select
            {...register('makeUp')}
            onChange={() => {
              setIsEdited(true);
            }}
          >
            {(divisionType === 'adult') ?
              adultMakeups.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              }) :
              youthMakeups.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })
            }
          </select>
          {formState.errors.makeUp ?
            <span className='error'>Makeup is required</span> :
            <label>Makeup Type</label>
          }
        </div>

        <div className='col'>
          <select
            {...register('competitionLevel')}
            onChange={() => {
              setIsEdited(true);
            }}
          >
            {(divisionType === 'adult') ?
              adultLevels.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              }) :
              youthLevels.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              })
            }
          </select>
          {formState.errors.competitionLevel ?
            <span className='error'>Competition Level is required</span> :
            <label>Competition Level</label>
          }
        </div>

      </div>
      <div className={`${fieldStyles.fieldsGroup}`}>
        <div className="inline-number">
          <label>Number of Pools</label>
          <input
            autoComplete='on'
            type='number' {...register('numberOfPools', {
              valueAsNumber: true,
            })}
            onChange={(e) => {
              const val = e.target.value;
              clearErrors('numberOfPools');
              setNumberOfPools(Number(val));
              setIsEdited(true);
            }} />
        </div>
      </div>

      <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
        <h3>Pool editor here...</h3>
      </div>

      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            clickHander={itemData ? handleAddItem : handleAddItem}
            disabled={!isEdited}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </div >
  )
}