import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/app/hooks';
import { updateFilters } from '@/features/leaguesListing/leaguesFiltersSlice';


const SearchBar = () => {
  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      search: '',
      status: 'all',
      country: '',
      isPro: false,
      isNonPro: false,
      championshipQualifier: false
    }
  });
  const { register, getValues, watch } = methods;

  const onChange = (e: any) => {
    if ((e.target.type !== 'radio' && e.target.type !== 'checkbox') || e.target.name === 'view') {
      dispatch(updateFilters(({ filters: { [e.target.name]: e.target.value } })));
    }
    else {
      dispatch(updateFilters(({ filters: { [e.target.name]: e.target.checked } })));
    }
  }


  return (

    <FormProvider {...methods}>
      <form className="formGroup pr-8">
        <div className='grid xl:grid-cols-6 sm:grid-cols-1 gap-4 mb-3 items-center'>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Status
            <select
              {...register('status')}
              onChange={onChange}
              className='w-full'
            >
              <option value='all'>All</option>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Pending'>Pending</option>
              <option value='Blocked'>Blocked</option>
            </select>
          </div>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Country
            <select {...register('country')} onChange={onChange} className='w-full'>
              <option value='al' hidden></option>
              <option value='US'>United States</option>
              <option value='AU'>Australia</option>
              <option value='IN'>India</option>
              <option value='UK'>United Kingdom</option>
              <option value='PH'>Philippines</option>
            </select>
          </div>
          <div className='text-blue-brand col-span-1 lg:col-span-4'>
            <div className='col-auto flex items-center float-right'>
              <div className="col ml-4">
                PRO (Non-sanctioned)
                <input type="checkbox" {...register('isPro')} onChange={onChange} className='ml-1 border-blue-brand checked:bg-blue-brand p-2 border-2 rounded-md' />
              </div>
              <div className="col ml-4">
                PRO (Sanctioned)
                <input type="checkbox" {...register('isNonPro')} onChange={onChange} className='ml-1 border-blue-brand checked:bg-blue-brand p-2 border-2 rounded-md' />
              </div>
              <div className="col ml-4">
                Regional World Championship Qualifier
                <input type="checkbox" {...register('championshipQualifier')} onChange={onChange} className='ml-1 border-blue-brand checked:bg-blue-brand p-2 border-2 rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>

  );
};

export default SearchBar;
