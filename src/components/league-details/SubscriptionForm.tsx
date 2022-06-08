import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import inlineFieldStyles from '@/components/forms/styles/InlineFields.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { addSubscriptionFee, removeSubscriptionFee, setEditSubscriptionFeeId, updateSubscriptionFee } from '@/features/affiliateDetails/affiliateDetailsSlice';
import { userDetails } from '@/static/affiliate';

import { SubscriptionFee } from '@/types/subscriptionFee';

type Props = {
  fee: SubscriptionFee;
  isAdd: boolean;
};

const schema = yup
  .object({
    // 'Fee Amount must be numeric only'
    feeAmount: yup.number().typeError('Fee Amount must be numeric only').required('Fee Amount is required'),
    country: yup.string().required(),
    state: yup.string().required(),
    validFrom: yup.string().required(),//date
    validTo: yup.string().nullable(),//date
  })
  .required();

const SubscriptionForm = ({ fee, isAdd }: Props) => {
  const dispatch = useAppDispatch();
  const today = moment().toDate();
  const formDefaultValues = {} as SubscriptionFee;

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
  const [startDate, setStartDate] = useState<Date>(today);

  useEffect(() => {
    Object.keys(formState.errors).length
      ? setHasErrors(true)
      : setHasErrors(false);
  }, [formState.errors, formState.isDirty]);

  useEffect(() => {
    reset(fee);
  }, [])

  const onSubmit = (data: SubscriptionFee) => {
    // eslint-disable-next-line no-console
    console.log('POST: sending data...', data as SubscriptionFee);
    // TODO: currently passing created date & changedDate which will be removed once api integration is done.
    data = {
      ...data,
      ...{
        createdBy: userDetails[0],
        createdDate: moment(today).format("MM/DD/YYYY"), //date
        changedBy: userDetails[0],
        changedDate: moment(today).format("MM/DD/YYYY"), //date
        validFrom: moment(data.validFrom).format("MM/DD/YYYY"),
        validTo: data.validTo ? moment(data.validTo).format("MM/DD/YYYY") : null,
      }
    }
    if (isAdd)
      dispatch(addSubscriptionFee(data as SubscriptionFee));
    else
      dispatch(updateSubscriptionFee(data as SubscriptionFee));
    reset();
    setStartDate(today);
    dispatch(setEditSubscriptionFeeId({ id: null }));
  };
  const cancel = () => {
    dispatch(setEditSubscriptionFeeId({ id: null }));
    if (fee.id !== undefined) {
      dispatch(removeSubscriptionFee(fee as SubscriptionFee));
    }
  }

  return (
    <td colSpan={10}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}
          className={`${hasErrors ? 'has-errors' : ''}`}>
          <div className="grid grid-flow-col col-auto">
            <div className={`${inlineFieldStyles.InlineField} w-24 max-w-xs`}>
              <input type="text" {...register('feeAmount')} onChange={() => clearErrors('feeAmount')} />
              {formState.errors.feeAmount && (
                <span className='error'>{formState.errors.feeAmount.message}</span>
              )}
            </div>
            <div className={`${inlineFieldStyles.InlineField} w-24 max-w-xs`}>
              <select {...register('country')} onChange={() => clearErrors('country')}>
                <option value="" disabled>Country</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="Philippines">Philippines</option>
              </select>
              {formState.errors.country && (
                <span className='error'>Country is required</span>
              )}
            </div>
            <div className={inlineFieldStyles.InlineField}>
              <select {...register('state')} onChange={() => clearErrors('state')}>
                <option value="" disabled>State</option>
                <option value="NY">NY</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
                <option value="Philippines">Philippines</option>
              </select>
              {formState.errors.state && (
                <span className='error'>State is required.</span>
              )}
            </div>
            <div className={inlineFieldStyles.InlineField}>
              <Controller
                name='validFrom'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <ReactDatePicker
                    selected={field?.value ? moment(field?.value).toDate() : null}
                    minDate={today}
                    onChange={(e) => field.onChange(e)}
                    onCalendarClose={() => {
                      // NOTE: state setter fx can't detect field.value actual onChange event
                      // NOTE: hence setter is called under onCalendarClose
                      if (field.value) {
                        setValue('validFrom', field.value);
                        setValue('validTo', null);
                        setStartDate(moment(field.value).toDate());
                        clearErrors('validFrom');
                      }
                    }}
                    className='datepicker-group'
                    placeholderText=''
                    dateFormat='MMMM d, yyyy'
                  />
                )}
              />
              {formState.errors.validFrom && (
                <span className='error'>Valid From Date is required</span>
              )}
            </div>
            <div className={inlineFieldStyles.InlineField}>
              <Controller
                name='validTo'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <ReactDatePicker
                    selected={field?.value ? moment(field?.value).toDate() : null}
                    minDate={moment(startDate).toDate()}
                    onChange={(e) => field.onChange(e)}
                    onCalendarClose={() => {
                      // NOTE: state setter fx can't detect field.value actual onChange event
                      // NOTE: hence setter is called under onCalendarClose
                      if (field.value) {
                        setValue('validTo', field.value);
                        clearErrors('validTo')
                      }
                    }}
                    className='datepicker-group'
                    placeholderText=''
                    dateFormat='MMMM d, yyyy'
                  />
                )}
              />
              {/* {formState.errors.validTo && (
                <span className='error'>Valid To Date is required</span>
              )} */}
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

export default SubscriptionForm;