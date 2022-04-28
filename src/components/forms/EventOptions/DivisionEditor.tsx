import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import divisionStyles from './Divisions.module.scss';
import formStyles from '@/components/forms/styles/ContactForm.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import { useAppDispatch } from '@/app/hooks';
import { useAppSelector } from '@/app/hooks';
import { getDivisions, updateDivision } from '@/features/eventCreationSteps/divisionsSlice';
import { adultLevels, adultMakeups, youthLevels, youthMakeups } from '@/static/divisionTypes';

import Pools from './Pools';

import ChevronIcon from '~/icons/chevron-down.svg';

const schema = yup
  .object({
    divisionType: yup.string().required(),
    makeUp: yup.string().required(),
    competitionLevel: yup.string().required(),
    numberOfPools: yup.number().positive(),
    pools: yup.array()
  })
  .required();

type Props = {
  divisionId: number
}

export const DivisionEditor = ({ divisionId }: Props) => {

  const dispatch = useAppDispatch();
  const divisions = useAppSelector(getDivisions);
  const item = divisions.find(i => i.id === divisionId);
  const poolsLength = item?.pools.length ?? 1;
  const defaultPool = { id: (poolsLength + 1), name: 'Pool ' + (poolsLength + 1), numberOfTeams: 8 };
  console.log('poolsLength: ', poolsLength);

  const [divisionType, setDivisionType] = useState('');
  const [makeUp, setMakeUp] = useState('');
  const [competitionLevel, setCompetitionLevel] = useState('');

  const [expand, setExpand] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const [totalTeams, setTotalTeams] = useState(0);

  const defaultValues = {
    divisionType: item?.divisionType ?? '',
    makeUp: item?.makeUp ?? '',
    competitionLevel: item?.competitionLevel ?? '',
    numberOfPools: poolsLength,
    pools: item?.pools ?? [],
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
    mode: 'onSubmit',
    defaultValues: defaultValues
  });

  // const watchFields = watch(["makeUp", "competitionLevel"]);
  const watchMakeUp = watch('makeUp', 'def watch');

  useEffect(() => {

    if (formState.isValid) {
      // Submit Division Form
      console.log('Division FORM is VALID');
      const payload = {
        id: divisionId,
        ...getValues(),
        isEdited: false,
        isValidated: true
      };
      dispatch(updateDivision(payload));
    } else {
      console.log('Division form is NOT VALID');
    }

  }, [formState.isValid]);

  useEffect(() => {
    if (divisionType === 'youth') {
      setValue('makeUp', 'boys');
      setMakeUp('boy');
      setValue('competitionLevel', '8 and under');
      setCompetitionLevel('8 and under');
    }
    if (divisionType === 'adult') {
      setValue('makeUp', "mens");
      setMakeUp('mens');
      setValue('competitionLevel', 'competitive');
      setCompetitionLevel('competitive');
    }
    console.log(getValues());
  }, [divisionType]);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    trigger();
  };

  const addPool = () => {
    setIsEdited(true);
    if (item?.pools) {
      const updatedPools = [...item.pools, defaultPool];
      const payload = {
        id: divisionId,
        ...getValues(),
        pools: updatedPools,
        isEdited: true,
        isValidated: false
      };
      dispatch(updateDivision(payload));
    }
  }

  const handleAddPool = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addPool();
  }

  const subtractPool = () => {
    setIsEdited(true);
    if (item?.pools && poolsLength > 1) {
      const updatedPools = [...item.pools];
      updatedPools.pop();
      const payload = {
        id: divisionId,
        ...getValues(),
        pools: updatedPools,
        isEdited: true,
        isValidated: false
      };
      dispatch(updateDivision(payload));
    }
  }

  const numerOfPoolsRef = useRef(0);
  const handleNumberOfPoolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEdited(true);
    const oldValue = numerOfPoolsRef.current;
    const newValue = Number(e.target.value);
    oldValue < newValue ?
      addPool() :
      subtractPool();
    // store new value to ref     
    numerOfPoolsRef.current = Number(e.target.value);
  }

  console.log('DivisionEditor render...');

  return (
    <div className={`${formStyles.contactForm} ${divisionStyles.divisionEditor} ${expand ? formStyles['expanded'] : formStyles['collapsed']}`} >
      <h3 onClick={(e) => {
        e.preventDefault();
        setExpand(!expand);
      }}>
        <span>{divisionId}. </span>
        {divisionType ?
          <span>{divisionType} {makeUp} {competitionLevel}</span>
          :
          'New Division'
        }
        <ChevronIcon />
      </h3>
      <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']} togglelable`}>
        <div className='col'>
          <select
            {...register('divisionType')}
            onChange={(e) => {
              setDivisionType(e.target.value);
              setIsEdited(true);
            }}
          >
            <option value='adult'>Adult</option>
            <option value='youth'>Youth</option>
          </select>
          {formState.errors.divisionType ?
            <span className='error'>Division Type is required</span> :
            <label>Division Type</label>
          }
        </div>
        <div className='col'>
          <select
            {...register('makeUp')}
            onChange={(e) => {
              setMakeUp(e.target.value);
              setIsEdited(true);
            }}
          >
            {(divisionType === 'youth') ?
              youthMakeups.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
              }) :
              adultMakeups.map((item, i) => {
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
            onChange={(e) => {
              setCompetitionLevel(e.target.value);
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
      <div className={`${fieldStyles.fieldsGroup} togglelable`}>
        <div className="inline-number">
          <label>Number of Pools</label>
          <input
            autoComplete='on'
            step='1'
            min={1}
            value={poolsLength}
            onKeyDown={(e) => e.preventDefault()}
            type='number' {...register('numberOfPools', {
              valueAsNumber: true,
            })}
            onChange={handleNumberOfPoolsChange}
          />
        </div>
      </div>

      <Pools divisionId={divisionId} />

      <div className="team-info togglelable">
        <button onClick={handleAddPool}>Add Pool +</button>
        <div className="capacity">
          <span>Team Capacity | </span>
          <span>{totalTeams} Teams</span>
        </div>
      </div>
      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            clickHander={handleSave}
            disabled={!isEdited}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </div >
  )
}

export default DivisionEditor;

