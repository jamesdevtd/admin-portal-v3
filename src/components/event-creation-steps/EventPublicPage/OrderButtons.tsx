import React from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

import { useAppDispatch } from '@/app/hooks';
import { setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import { deleteField, moveFieldDown, moveFieldUp } from '@/features/eventCreation/eventPublicPageSlice';

import TrashIcon from '~/icons/grey/trash.svg';

type Props = {
  itemId: number,
}

export default function DragButtons({ itemId }: Props) {
  const dispatch = useAppDispatch();

  const setIsFormEdited = () => {
    dispatch(setIsEditedById(3));
  }
  function handleUp() {
    dispatch(moveFieldUp(itemId));
    setIsFormEdited();
  }
  function handleDown() {
    dispatch(moveFieldDown(itemId));
    setIsFormEdited();
  }
  function handleDelete() {
    dispatch(deleteField(itemId));
    setIsFormEdited();
  }

  return (
    <div className='DragButtons'>
      <button onClick={handleUp}><HiOutlineChevronUp /></button>
      <button onClick={handleDown}><HiOutlineChevronDown /></button>
      <button onClick={handleDelete} className='delete'><TrashIcon /></button>
    </div>
  )
}