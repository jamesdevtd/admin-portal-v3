import React from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import { deleteField, getFields, getFieldsLength, moveFieldDown, moveFieldUp } from '@/features/eventCreation/eventPublicPageSlice';

import TrashIcon from '~/icons/grey/trash.svg';

type Props = {
  fieldId: number,
  itemIndex: number
}

export default function OrderButtons({ fieldId, itemIndex }: Props) {
  const dispatch = useAppDispatch();
  const fieldsLength = useAppSelector(getFieldsLength);
  const fields = useAppSelector(getFields);

  const setIsFormEdited = () => {
    dispatch(setIsEditedById(3));
  }
  function handleUp() {
    dispatch(moveFieldUp(itemIndex));
    setIsFormEdited();
  }
  function handleDown() {
    dispatch(moveFieldDown(itemIndex));
    setIsFormEdited();
  }
  function handleDelete() {
    dispatch(deleteField(itemIndex));
    setIsFormEdited();
  }
  function isUpNotText() {
    if (itemIndex > 0) {
      const fromIndex = itemIndex;
      const toIndex = itemIndex - 1;
      if (fields[fromIndex].type === 'text' && fields[toIndex].type === 'text') {
        return false;
      } else {
        return true;
      }
    }
  }
  function isDownNotText() {
    if (itemIndex < fields.length - 1) {
      const fromIndex = itemIndex;
      const toIndex = itemIndex + 1;
      if (fields[fromIndex].type === 'text' && fields[toIndex].type === 'text') {
        return false;
      } else {
        return true;
      }
    }
  }

  return (
    <div className={`OrderButtons index-${itemIndex} id-${fieldId}`}>
      {(itemIndex !== 0 && isUpNotText()) &&
        <button onClick={handleUp}><HiOutlineChevronUp /></button>
      }
      {(itemIndex < fieldsLength - 1 && isDownNotText()) &&
        <button onClick={handleDown}><HiOutlineChevronDown /></button>
      }
      {(fieldId > 1) &&
        <button onClick={handleDelete} className='delete'><TrashIcon /></button>
      }
    </div>
  )
}