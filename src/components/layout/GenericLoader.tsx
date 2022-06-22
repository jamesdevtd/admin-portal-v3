import React from 'react'

import { useAppSelector } from '@/app/hooks';
import { isLoaderShown } from '@/features/loader/loaderSlice';

const loaderImgUrl = '/images/loading.gif';
import styles from '@/components/layout/Loader.module.scss';

import TagX from '~/svg/tagx.svg';


export default function GenericLoader() {
  const isLoaderShowing = useAppSelector(isLoaderShown);

  return (
    <>
      {isLoaderShowing &&
        <div className={styles.loader}>
          <TagX className='logo' />
          <img src={loaderImgUrl} alt="loader" className='block' />
        </div>
      }
    </>
  )
}