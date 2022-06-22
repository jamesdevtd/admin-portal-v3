import React from 'react'

const loaderImgUrl = '/images/loading.gif';
import TagX from '~/svg/tagx.svg';

export default function Loader() {
  return (
    <div className='loader'>
      <TagX className='logo' />
      <img src={loaderImgUrl} alt="loader" className='block' />
    </div>
  )
}