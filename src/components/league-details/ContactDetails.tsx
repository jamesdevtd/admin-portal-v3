import { useState } from 'react';
import { HiOutlinePencilAlt, HiPlus } from 'react-icons/hi';

import tabStyles from './AffiliateDetails.module.scss';
import leagueDetailStyles from './LegueDetails.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEditContactId, setEditContactId } from '@/features/affiliateDetails/affiliateDetailsSlice';

import ContactDetailForm from './ContactDetailForm';
import StyledTable from '../layout/StyledTableWrap';

import ContactDetails from '@/types/contactDetails';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  contacts: ContactDetails[];
};

const ContactDetails = ({ contacts }: Props) => {
  const dispatch = useAppDispatch();
  const editContactId = useAppSelector(getEditContactId);
  const [expand, setExpand] = useState(false);


  return (
    <div
      className={`${tabStyles['tab-container']} ${tabStyles.affiliate} ${expand ? tabStyles['expanded'] : tabStyles['collapsed']
        }`}
    >
      <h3
        onClick={(e) => {
          e.preventDefault();
          setExpand(!expand);
        }}
      >
        Contact Details
        <ChevronIcon />
      </h3>
      <div className='my-1 w-full text-sm'>
        <input
          type='checkbox'
          className='mr-1 rounded-md border-2 border-blue-brand p-1 checked:bg-blue-brand'
        />
        Same as Affiliate
      </div>
      <div className='togglelable box-bg'>
        <StyledTable className={leagueDetailStyles.GridContainer}>
          <table className='w-full table-auto'>
            <thead className='text-white'>
              <tr>
                <th className='w-auto text-left'>Name</th>
                <th className='w-auto text-left'>Email</th>
                <th className='w-auto text-left'>Phone</th>
                <th className='w-auto text-left'>Added</th>
                <th className='w-auto text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact: ContactDetails, index) => (
                <tr key={index}>
                  {editContactId === contact.id ? (
                    <ContactDetailForm contact={contact} isAdd={false} />
                  ) : (
                    <>
                      <td className='capitalize'>{`${contact?.firstName} ${contact?.lastName}`}</td>
                      <td>{contact?.email}</td>
                      <td>{contact?.phone}</td>
                      <td>03/21/21</td>
                      <td>
                        <button type="button" onClick={() => dispatch(setEditContactId({ id: contact.id }))}>
                          <HiOutlinePencilAlt className='text-xl text-gray-light' />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr className={`${editContactId === 0 ? '' : 'hidden'}`}>
                <ContactDetailForm contact={{} as ContactDetails} isAdd={true} />
              </tr>
            </tbody>
          </table>
        </StyledTable>
        <button className='my-2 flex w-full items-center pl-9 text-sm text-blue-brand hover:text-blue-start' type='button' onClick={() => dispatch(setEditContactId({ id: 0 }))}>
          Add Contact <HiPlus />
        </button>
      </div>
    </div >
  );
};

export default ContactDetails;
