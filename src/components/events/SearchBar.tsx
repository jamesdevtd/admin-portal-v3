import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SearchBarStyles from '@/components/events/SearchBar.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { updateFilters } from '@/features/eventsListing/eventsFiltersSlice';

// import styles from '@/components/forms/styles/FormGroup.module.scss';
import SearchIcon from '~/svg/search-icon.svg';

const SearchBar = () => {
  const dispatch = useAppDispatch();

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { register, getValues, handleSubmit } = methods;
  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
  }
  const onChange = (e: any) => {
    if ((e.target.type !== 'radio' && e.target.type !== 'checkbox') || e.target.name === 'view') {
      dispatch(updateFilters({ [e.target.name]: e.target.value }));
    }
    else {
      dispatch(updateFilters({ [e.target.name]: e.target.checked }));
    }
  }
  //#endregion  //*======== Form ===========

  useEffect(() => {
    dispatch(updateFilters(getValues()));
    // console.log(getValues());
  }, []);


  return (
    <FormProvider {...methods}>{/*  ${styles.formGroup} */}
      <form className={`${SearchBarStyles.formGroup}`} onSubmit={handleSubmit(onSubmit)}>
        <div className='grid xl:grid-cols-5 sm:grid-cols-1 gap-4 mb-3 items-center'>
          <div className='text-blue-brand flex items-center pl-1'>
            View
            <ul className="flex items-center ml-5 bg-gray-200 rounded-lg w-28">
              <li className="relative w-full">
                <input className="sr-only peer" type="radio" value="card" id="card" {...register('view')} onChange={onChange} defaultChecked />
                <label className="block text-center text-gray-600 py-1 rounded-l-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-blue-brand peer-checked:rounded-r-lg peer-checked:text-white" htmlFor="card">Card</label>
              </li>
              <li className="relative w-full">
                <input className="sr-only peer" type="radio" value="grid" id="grid" {...register('view')} onChange={onChange} />
                <label className="block text-center text-gray-600 py-1 rounded-r-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-blue-brand peer-checked:rounded-l-lg peer-checked:text-white" htmlFor="grid">Grid</label>
              </li>
            </ul>
          </div>
          <div className='text-blue-brand flex items-center col-span-1 lg:col-span-3'>
            Display My Events Only
            <input type="checkbox" {...register('own')} className='ml-1 border-blue-brand checked:bg-blue-brand p-2 border-2 rounded-md' onChange={onChange} />
          </div>
          <div>
            <label className="relative block rounded-md">
              <span className="sr-only">Search</span>
              <input className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-3 pr-9 shadow-sm focus:outline-none focus:border-blue-brand focus:ring-blue-brand focus:ring-1 sm:text-sm" placeholder="Search for an Event by Name" type="text" {...register('search')} onChange={onChange} />
              <button className="absolute inset-y-0 right-0 flex items-center px-3 m-0.5 rounded-md bg-blue-brand hover:bg-blue-start" type='button'>
                <SearchIcon className="h-4 w-5 fill-slate-300" />
              </button>
            </label>
          </div>
        </div>
        <div className='grid xl:grid-cols-6 sm:grid-cols-1 gap-4 mb-3 items-center'>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Country
            <select
              {...register('country')}
              className='w-full'
              onChange={onChange}
              defaultValue="US"
            >
              <option value='' hidden></option>
              <option value='US'>United States</option>
              <option value='AU'>Australia</option>
              <option value='IN'>India</option>
              <option value='UK'>United Kingdom</option>
              <option value='PH'>Philippines</option>
            </select>
          </div>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Type
            <select
              {...register('type')}
              className='w-full'
              onChange={onChange}
              defaultValue="Open"
            >
              <option value='' hidden></option>
              <option value='Open'>Open</option>
              <option value='Draft'>Draft</option>
              <option value='Closed'>Closed</option>
            </select>
          </div>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Series
            <select
              {...register('series')}
              className='w-full'
              onChange={onChange}
              defaultValue="1"
            >
              <option value='All'>All</option>
              <option value='Series 1'>Series 1</option>
              <option value='Series 2'>Series 2</option>
              <option value='Series 3'>Series 3</option>
              <option value='Series 4'>Series 4</option>
              <option value='Series 5'>Series 5</option>
              <option value='Series 6'>Series 6</option>
              <option value='Series 7'>Series 7</option>
              <option value='Series 8'>Series 8</option>
              <option value='Series 9'>Series 9</option>
            </select>
          </div>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Division
            <select
              {...register('division')}
              className='w-full'
              onChange={onChange}
              defaultValue="Mens"
            >
              <option value='All'>All</option>
              <option value='Mens'>Mens</option>
              <option value='Womens'>Womens</option>
            </select>
          </div>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Status
            <select
              {...register('status')}
              className='w-full'
              onChange={onChange}
              defaultValue="All"
            >
              <option value='All'>All</option>
              <option value='Live'>Live</option>
              <option value='Closed'>Closed</option>
              <option value='Open'>Open</option>
            </select>
          </div>
          <div className='text-blue-dark font-bold text-md flex items-center pl-1'>
            Date Range
            <select
              {...register('date')}
              className='w-28'
              onChange={onChange}
              defaultValue="All"
            >
              <option value='' hidden></option>
              <option value='All'>All</option>
              <option value='Draft'>Draft</option>
              <option value='Closed'>Closed</option>
            </select>
          </div>
        </div>
      </form>
    </FormProvider>

  );
};

export default SearchBar;
