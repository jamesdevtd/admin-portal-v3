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
    defaultValues: {
      view: 'card',
      own: false,
      search: '',
      country: 'US',
      type: 'all',
      series: 'all',
      division: 'all',
      status: 'all',
      date: '',
    }
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

        <div className='top-filters'>
          <div className='view-type'>
            View
            <ul>
              <li>
                <input className="sr-only peer" type="radio" value="card" id="card" {...register('view')} onChange={onChange} defaultChecked />
                <label htmlFor="card">Card</label>
              </li>
              <li>
                <input className="sr-only peer" type="radio" value="grid" id="grid" {...register('view')} onChange={onChange} />
                <label htmlFor="grid">List</label>
              </li>
            </ul>
          </div>
          <div className='toggle-display'>
            Display My Events Only
            <input type="checkbox" {...register('own')} onChange={onChange} />
          </div>
          <div className='search-bar'>
            <label>
              <span className="sr-only">Search</span>
              <input placeholder="Search for an Event by Name" type="text" {...register('search')} onChange={onChange} />
              <button type='button'>
                <SearchIcon />
              </button>
            </label>
          </div>
        </div>

        <div className='dropdown-filters'>
          <div className="col">
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
          <div className="col">
            Type
            <select
              {...register('type')}
              className='w-full'
              onChange={onChange}
              defaultValue="all"
            >
              <option value='' hidden></option>
              <option value='all'>All</option>
              <option value='open'>Open</option>
              <option value='draft'>Draft</option>
              <option value='closed'>Closed</option>
            </select>
          </div>
          <div className="col">
            Series
            <select
              {...register('series')}
              className='w-full'
              onChange={onChange}
              defaultValue="1"
            >
              <option value='all'>All</option>
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
          <div className="col">
            Division
            <select
              {...register('division')}
              className='w-full'
              onChange={onChange}
              defaultValue="mens"
            >
              <option value='all'>All</option>
              <option value='mens'>Mens</option>
              <option value='womens'>Womens</option>
            </select>
          </div>
          <div className="col">
            Status
            <select
              {...register('status')}
              className='w-full'
              onChange={onChange}
              defaultValue="All"
            >
              <option value='all'>All</option>
              <option value='live'>Live</option>
              <option value='closed'>Closed</option>
              <option value='open'>Open</option>
            </select>
          </div>
          <div className="col">
            Date Range
            <select
              {...register('date')}
              className='w-28'
              onChange={onChange}
              defaultValue="all"
            >
              <option value='' hidden></option>
              <option value='all'>All</option>
              <option value='draft'>Draft</option>
              <option value='closed'>Closed</option>
            </select>
          </div>
        </div>
      </form>
    </FormProvider>

  );
};

export default SearchBar;
