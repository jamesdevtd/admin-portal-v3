import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import inlineFieldStyles from '@/components/forms/styles/InlineFields.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { addAffiliateFee, removeAffiliateFee, setEditAffiliateFeeId, updateAffiliateFee } from '@/features/affiliateDetails/affiliateDetailsSlice';

import { DivisionProps, PlayerFeeItemProps } from '@/types/division';

type Props = {
  // TODO: need to discuss & fix divisions  & affiliate fees as I've got it wrong I guess.
  division: DivisionProps;
  isAdd: boolean;
};

const schema = yup
  .object({
    fee: yup.string().required(),
  })
  .required();

const AffiliateForm = ({ division, isAdd }: Props) => {
  const dispatch = useAppDispatch();
  const formDefaultValues = {} as PlayerFeeItemProps;

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues,
  });
  const {
    handleSubmit,
    register,
    clearErrors,
    getValues,
    setValue,
    formState,
    control,
    reset
  } = methods;

  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    Object.keys(formState.errors).length
      ? setHasErrors(true)
      : setHasErrors(false);
  }, [formState.errors, formState.isDirty]);

  useEffect(() => {
    reset(division.playerFee);
  }, [])

  const onSubmit = (data: PlayerFeeItemProps) => {
    const tempDivision = { ...division, ...{ playerFee: data } };
    // eslint-disable-next-line no-console
    console.log('POST: sending data...', tempDivision);
    if (isAdd)
      dispatch(addAffiliateFee(tempDivision as DivisionProps));
    else
      dispatch(updateAffiliateFee(tempDivision as DivisionProps));
    reset();
    dispatch(setEditAffiliateFeeId({ id: null, poolId: null }));
  };
  const cancel = () => {
    dispatch(setEditAffiliateFeeId({ id: null, poolId: null }));
    if (division.id !== undefined) {
      dispatch(removeAffiliateFee(division as DivisionProps));
    }
  }

  return (
    <td colSpan={10}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}
          className={`${hasErrors ? 'has-errors' : ''}`}>
          <div className="grid grid-flow-col col-auto">
            <div className={`${inlineFieldStyles.InlineField} w-24 max-w-xs`}>
              <input type="text" {...register('fee')} onChange={() => clearErrors('fee')} />
              {formState.errors.fee && (
                <span className='error'>Player Fee is required.</span>
              )}
            </div>
            <div className='flex justify-around w-40'>
              <button type="submit" className='btn mt-2 h-5 blue-outline'>ok</button>
              <button type="button" className='btn mt-2 h-5 red' onClick={cancel}>Remove</button>
            </div>
          </div>
        </form>
      </FormProvider>
    </td>
  );
};

export default AffiliateForm;