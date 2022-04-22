import React, { useEffect, useState } from 'react';

import styles from './ContactDetails.module.scss';

import ContactDetailForm from './ContactDetailForm';

import ContactDetailsProps from '@/types/contactDetails';

import PlusIcon from '~/icons/blue/plus.svg';



type Props = {
  items: ContactDetailsProps[];
  handleAddContactItem: (val: ContactDetailsProps) => void
};

const defaultProps = {
  firstName: 'Jonathan',
  lastName: 'Rabinowitsky',
  email: 'jtherabbit2022@gmail.com',
  mobilePhone: '+0001(914) 428 3195',
};

export default function ContactDetails({ items, handleAddContactItem }: Props) {
  const [showBlankForm, setShowBlankForm] = useState(false);

  useEffect(() => {
    console.log('ContactDetails items: ', items);
  }, [items]);

  const handleAddItem = () => {
    //
    console.log('handleAddItem');
  }

  const removeForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('removeForm:');
    setShowBlankForm(false);
  };

  return (
    <div className={`${styles.contactDetails}`}>
      {(items.length > 0) &&
        <div className="items">
          <h4>items here....</h4>
        </div>
      }
      {showBlankForm ?
        <ContactDetailForm handleAddContactItem={handleAddContactItem} removeForm={removeForm} /> :
        <div className='add-new' onClick={(e) => {
          e.preventDefault();
          setShowBlankForm(true);
        }}>
          <span>Add New Contact</span>
          <PlusIcon />
        </div>
      }
    </div>
  );
}