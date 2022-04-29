import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import * as yup from 'yup';

import divisionStyles from './Divisions.module.scss';
import formStyles from '@/components/forms/styles/ContactForm.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import { useAppDispatch } from '@/app/hooks';
import { useAppSelector } from '@/app/hooks';
import { getDivsionById, getTotalTeams, updateDivision } from '@/features/eventCreationSteps/divisionsSlice';
import { adultLevels, adultMakeups, youthLevels, youthMakeups } from '@/static/divisionTypes';

import Pools from './Pools';

import ChevronIcon from '~/icons/chevron-down.svg';

const schema = yup
  .object({
    divisionType: yup.string().required(),
    makeUp: yup.string().required(),
    competitionLevel: yup.string().required()
  })
  .required();

type Props = {
  divisionId: number
}

export const DivisionEditor = ({ divisionId }: Props) => {

  const dispatch = useAppDispatch();
  const item = useAppSelector(getDivsionById(divisionId));
  const totalTeamCount = useAppSelector(getTotalTeams(divisionId));

  const poolsLength = item?.pools.length ?? 1;
  const defaultPool = { id: (poolsLength + 1), name: 'Pool ' + (poolsLength + 1), numberOfTeams: 8 };

  const [divisionType, setDivisionType] = useState('');
  const [makeUp, setMakeUp] = useState('');
  const [competitionLevel, setCompetitionLevel] = useState('');

  const [expand, setExpand] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const divisionRootPayload = {
    id: divisionId,
    divisionType: divisionType,
    makeUp: makeUp,
    competitionLevel: competitionLevel
    // other itmes to add for dispatch
    // numberOfPools, pools, isEdited, isValidated, playerFee
  }

  const defaultValues = {
    divisionType: item?.divisionType ?? '',
    makeUp: item?.makeUp ?? '',
    competitionLevel: item?.competitionLevel ?? '',
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

  useEffect(() => {

    if (formState.isValid) {
      // Submit Division Form
      console.log('Division FORM is VALID');
      saveDivision();
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
    // console.log(getValues());
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
        ...divisionRootPayload,
        numberOfPools: item.numberOfPools + 1,
        pools: updatedPools,
        isEdited: true,
        isValidated: true,
        playerFee: item?.playerFee
      };
      // console.log('addPool: ', payload);
      dispatch(updateDivision(payload));
    }
  }

  const handleAddPool = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // console.log('handleAddPool');
    addPool();
  }

  const subtractPool = () => {
    setIsEdited(true);
    if (item?.pools && poolsLength > 1) {
      const updatedPools = [...item.pools];
      updatedPools.pop();
      const payload = {
        ...divisionRootPayload,
        numberOfPools: item.numberOfPools - 1,
        pools: updatedPools,
        isEdited: true,
        isValidated: true,
        playerFee: item?.playerFee
      };
      // console.log(payload);
      dispatch(updateDivision(payload));
    }
  }

  const numerOfPoolsRef = useRef(0);
  const handleNumberOfPoolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEdited(true);
    const oldValue = numerOfPoolsRef.current;
    const newValue = Number(e.target.value);
    if (oldValue < newValue) {
      addPool()
    }
    if (oldValue > newValue) {
      subtractPool();
    }

    // store new value to ref     
    numerOfPoolsRef.current = Number(e.target.value);
  }

  const saveDivision = () => {
    const payload = {
      id: divisionId,
      divisionType: divisionType,
      makeUp: makeUp,
      competitionLevel: competitionLevel,
      numberOfPools: item?.numberOfPools ?? 1,
      pools: item?.pools ?? [],
      isEdited: false,
      isValidated: true,
      playerFee: item?.playerFee,
    };
    dispatch(updateDivision(payload));
  }


  console.log(`DivisionEditor id: ${divisionId} render...`);
  console.log('form values:', getValues());

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
        <div className="styled-number-input">
          <label>Number of Pools</label>
          <input
            autoComplete='on'
            step='1'
            min={1}
            value={poolsLength}
            onKeyDown={(e) => e.preventDefault()}
            type='number'
            onChange={handleNumberOfPoolsChange}
          />
          <HiOutlineChevronUp onClick={addPool} />
          <HiOutlineChevronDown onClick={subtractPool} />
        </div>
      </div>

      <Pools divisionId={divisionId} />

      <div className="team-info togglelable">
        <button onClick={handleAddPool}>Add Pool +</button>
        <div className="capacity">
          <span>Team Capacity | </span>
          <span>{totalTeamCount} Teams</span>
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

