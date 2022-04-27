import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import divisionStyles from './Divisions.module.scss';
import formStyles from '@/components/forms/styles/ContactForm.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import { useAppDispatch } from '@/app/hooks';
import { updateDivision } from '@/features/eventCreationSteps/divisionsSlice';
import { adultLevels, adultMakeups, youthLevels, youthMakeups } from '@/static/divisionTypes';

import Pools from './Pools';

import { DivisionProps, PoolItemProps } from '@/types/division';

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
  itemData?: DivisionProps
}

export const DivisionEditor: React.FC<Props> = ({ itemData }) => {

  const dispatch = useAppDispatch();

  const [divisionType, setDivisionType] = useState<string>('adult');
  const [makeUp, setMakeUp] = useState<string | null>(null);
  const [competitionLevel, setCompetitionLevel] = useState<string | null>(null);

  const [numberOfPools, setNumberOfPools] = useState<number>(1);
  const [poolItems, setPoolItems] = useState<PoolItemProps[]>([{ id: 1, name: 'Pool 1', numberOfTeams: 8 }]);
  const [teamCount, setTeamCount] = useState(8);

  const [expand, setExpand] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const defaultValues = {
    divisionType: itemData?.divisionType ?? '',
    makeUp: itemData?.makeUp ?? '',
    competitionLevel: itemData?.competitionLevel ?? '',
    numberOfPools: itemData?.numberOfPools ?? 8,
    pools: itemData?.pools ?? []
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

  const handleUpdateDivision = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    trigger();
    if (formState.isValid) {
      const updatedData = { ...getValues(), id: itemData?.id, isEdited: isEdited };
      console.log('handleUpdateDIvision:, ', updatedData);
      // TODO: remove any, create new DevisionCreator component
      dispatch(updateDivision(updatedData as any));
      // updateItem(updatedData);
      // setIsEdited(false);
    }
  };

  const addPool = () => {
    const newItem = {
      name: 'Pool ' + (numberOfPools + 1),
      numberOfTeams: 8
    }
    console.log('addPool: ', newItem);
    // setPoolItems((oldArray) => [...oldArray, newItem]);
  }

  const removePool = () => {
    const newItems = [...poolItems];
    newItems.slice(0, -1);
    console.log('origPools: ', poolItems);
    console.log('removedPool: ', newItems);
    // setPoolItems(newItems);
  }

  const handleAddPool = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue('numberOfPools', getValues('numberOfPools') + 1);
    // addPool();
  };

  useEffect(() => {
    if (divisionType === 'youth') {
      setValue('makeUp', 'boys');
      setValue('competitionLevel', '8 and under');
    } else {
      setValue('makeUp', "mens");
      setValue('competitionLevel', 'competitive');
    }
  }, [divisionType]);

  const prevCount = useRef<number>();
  const handlePoolCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handlePoolCountChange');
    console.log('prev:', prevCount.current = numberOfPools);
    const oldVal = prevCount.current;
    const newVal = Number(e.target.value);
    console.log('current:',);
    if (newVal && oldVal < newVal) {
      addPool();
    }
    if (newVal && oldVal > newVal) {
      removePool();
    }
    setNumberOfPools(newVal);
  }

  return (
    <div className={`${formStyles.contactForm} ${divisionStyles.divisionEditor} ${expand ? formStyles['expanded'] : formStyles['collapsed']}`} >
      <h3 onClick={(e) => {
        e.preventDefault();
        setExpand(!expand);
      }}>
        {itemData?.id != undefined &&
          <span>{itemData?.id}.</span>
        }
        <span>
          {divisionType ?? getValues('divisionType')}
        </span>
        <span>
          {makeUp ?? getValues('makeUp')}
        </span>
        <span>
          {competitionLevel ?? getValues('competitionLevel')}
        </span>
        <ChevronIcon />
      </h3>
      <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
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
            step='1'
            min={1}
            onKeyDown={(e) => e.preventDefault()}
            type='number' {...register('numberOfPools', {
              valueAsNumber: true,
            })}
            onChange={handlePoolCountChange}
          />
        </div>
      </div>

      <Pools pools={poolItems} setPoolItems={setPoolItems} />

      <div className="team-info">
        <button onClick={handleAddPool}>Add Pool +</button>
        <div className="capacity">
          <span>Team Capacity | </span>
          <span>{teamCount} Teams</span>
        </div>
      </div>
      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            clickHander={handleUpdateDivision}
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