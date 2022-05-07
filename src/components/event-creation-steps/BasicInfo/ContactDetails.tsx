import React, { useState } from 'react';

import styles from './ContactDetails.module.scss';

import ContactCreator from './ContactCreator';
import ContactEditor from './ContactEditor';

import ContactDetailsProps from '@/types/contactDetails';

import PlusIcon from '~/icons/blue/plus.svg';



type Props = {
  items: ContactDetailsProps[];
  handleAddContactItem: (val: ContactDetailsProps) => void;
  handleRemoveContactItem: (val: ContactDetailsProps) => void
  handleUpdateContactItem: (val: ContactDetailsProps) => void
};

export default function ContactDetails({
  items,
  handleAddContactItem,
  handleRemoveContactItem,
  handleUpdateContactItem
}: Props) {
  const [showBlankForm, setShowBlankForm] = useState(false);

  return (
    <div className={`${styles.contactDetails}`}>
      {(items.length > 0) &&
        <div className="items">
          {items.map(item =>
            <div className="item" key={item.id}>
              <ContactEditor
                itemData={item}
                updateItem={handleUpdateContactItem}
                removeItem={handleRemoveContactItem} />
            </div>
          )}
        </div>
      }
      {showBlankForm ?
        <ContactCreator
          itemsLength={items.length}
          addItem={handleAddContactItem}
          setShowBlankForm={setShowBlankForm} /> :
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