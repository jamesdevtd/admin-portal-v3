import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './DivisionForm.module.scss';
import fieldStyles from '@/components/forms/fields/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import DivisionProps from '@/types/division';


const schema = yup
  .object({
    divisionType: yup.string().required(),
    makeUp: yup.string().required(),
    competitionLevel: yup.string().email().required(),
    numberOfPools: yup.number().integer().positive().required(),
    // TODO: phone number validation
    // phone: yup.string().nullable().matches(phoneRegExp, 'Phone number is not valid'),
  })
  .required();

const formDefaultValues = {
  divisionType: '',
  makeUp: '',
  competitionLevel: '',
  numberOfPools: 0
}

type Props = {
  handleAddDivision: (val: DivisionProps) => void,
  removeForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function DivisionForm({ handleAddDivision, removeForm }: Props) {
  const [divisionType, setDivisionType] = useState('');
  const [makeUp, setMakeUp] = useState('');
  const [competitionLevel, setCompetitionLevel] = useState('');

  const {
    register,
    clearErrors,
    getValues,
    trigger,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues
  });

  // TODO validation and saving
  // useEffect(() => {
  //   if (hasErrors) {
  //     console.log('form has errors: ', formState.errors);
  //     trigger();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasErrors]);

  // useEffect(() => {
  //   Object.keys(formState.errors).length ? setHasErrors(true) : setHasErrors(false);
  // }, [formState]);


  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('validating data...');
    trigger();
  };

  return (
    <form className={`${styles.divisionForm} item`} >
      <h3>
        <span className="number">1</span>
        New Division
      </h3>
      <div className={`${fieldStyles.fieldsGroup} inner-box`}>
        <div className='col'>
          <input
            type='text' {...register('divisionType')}
            onChange={(e) => {
              setDivisionType(e.target.value);
              clearErrors('divisionType');
            }}
          />
          {formState.errors.divisionType ?
            <span className='error'>Division Type is required</span> :
            <label>Division Type</label>
          }
        </div>
        <div className='col'>
          <input
            type='text' {...register('makeUp')}
            onChange={(e) => {
              setMakeUp(e.target.value);
              clearErrors('makeUp');
            }}
          />
          {formState.errors.makeUp ?
            <span className='error'>Makeup is required</span> :
            <label>Makeup</label>
          }
        </div>
        <div className='col'>
          <input
            type='text' {...register('competitionLevel')}
            onChange={(e) => {
              setCompetitionLevel(e.target.value);
              clearErrors('competitionLevel');
            }}
          />
          {formState.errors.competitionLevel ?
            <span className='error'>Competition Level is required</span> :
            <label>Competition Level</label>
          }
        </div>

      </div>
      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            variant='grey'
            clickHander={removeForm}
            className='hidden'
          >
            Remove
          </SubmitButton>
          <SubmitButton
            clickHander={submitForm}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}