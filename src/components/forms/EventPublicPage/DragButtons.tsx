import React from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

import { useAppDispatch } from '@/app/hooks';

import TrashIcon from '~/icons/grey/trash.svg';

type Props = {
  itemId: number,
}

export default function DragButtons({ itemId }: Props) {
  const dispatch = useAppDispatch();
  // const itemState = useAppSelector(getItemById(itemId));

  function handleUp() {
    console.log('up');
  }
  function handleDown() {
    console.log('down');
  }
  function handleDelete() {
    console.log('delete');
  }

  return (
    <div className='DragButtons'>
      <button onClick={handleUp}><HiOutlineChevronUp /></button>
      <button onClick={handleDown}><HiOutlineChevronDown /></button>
      <button onClick={handleDelete} className='delete'><TrashIcon /></button>
    </div>
  )
}