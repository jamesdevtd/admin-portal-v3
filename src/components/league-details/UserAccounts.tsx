import { useState } from 'react';
import { HiOutlinePencilAlt, HiPlus } from 'react-icons/hi';

import tabStyles from './AffiliateDetails.module.scss';
import leagueDetailStyles from './LegueDetails.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEditUserId, setEditUserId } from '@/features/affiliateDetails/affiliateDetailsSlice';

import UserAccountForm from './UserAccountForm';
import StyledTable from '../layout/StyledTableWrap';

import UserDetails from '@/types/userDetails';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  users: UserDetails[];
};

const UserAccounts = ({ users }: Props) => {
  const dispatch = useAppDispatch();
  const editUserId = useAppSelector(getEditUserId);
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
        User Accounts
        <ChevronIcon />
      </h3>
      <div className='togglelable box-bg'>
        <StyledTable className={leagueDetailStyles.GridContainer}>
          <table className='w-full table-auto'>
            <thead className='text-white'>
              <tr>
                <th className='w-auto text-left'>Name</th>
                <th className='w-auto text-left'>Email</th>
                <th className='w-auto text-left'>Role</th>
                <th className='w-auto text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserDetails) => (
                <tr key={user?.id}>
                  {editUserId === user.id ? (
                    <UserAccountForm user={user} isAdd={false} />
                  ) : (
                    <>
                      <td className='capitalize'>{`${user?.firstName} ${user?.lastName}`}</td>
                      <td>{user?.email}</td>
                      <td>{user?.role}</td>
                      <td>
                        <button type="button" onClick={() => dispatch(setEditUserId({ id: user.id }))}>
                          <HiOutlinePencilAlt className='text-xl text-gray-light' />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr className={`${editUserId === 0 ? '' : 'hidden'}`}>
                <UserAccountForm user={{} as UserDetails} isAdd={true} />
              </tr>
            </tbody>
          </table>
        </StyledTable>
        <button className='my-2 flex w-full items-center pl-9 text-sm text-blue-brand hover:text-blue-start' onClick={() => dispatch(setEditUserId({ id: 0 }))}>
          Add Contact <HiPlus />
        </button>
      </div>
    </div>
  );
};

export default UserAccounts;
