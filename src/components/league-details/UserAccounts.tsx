import { useState } from 'react';
import { HiOutlinePencilAlt, HiPlus } from 'react-icons/hi';

import tabStyles from './AffiliateDetails.module.scss';
import leagueDetailStyles from './LegueDetails.module.scss';

import StyledTable from '../layout/StyledTableWrap';

import UserDetails from '@/types/userDetails';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  users: UserDetails[];
};

const UserAccounts = ({ users }: Props) => {
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
                <th className='w-auto'>Name</th>
                <th className='w-auto'>Email</th>
                <th className='w-auto'>Role</th>
                <th className='w-auto'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserDetails) => (
                <tr key={user?.id}>
                  <td className='capitalize'>{`${user?.firstName} ${user?.lastName}`}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    <button>
                      <HiOutlinePencilAlt className='text-xl text-gray-light' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledTable>
        <button className='my-2 flex w-full items-center pl-9 text-sm text-blue-brand hover:text-blue-start'>
          Add Contact <HiPlus />
        </button>
      </div>
    </div>
  );
};

export default UserAccounts;
