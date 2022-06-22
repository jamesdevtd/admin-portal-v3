import moment from 'moment';
import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { RiVisaLine } from 'react-icons/ri';

import tabStyles from './AffiliateDetails.module.scss';
import leagueDetailStyles from './LegueDetails.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEditSubscriptionFeeId } from '@/features/affiliateDetails/affiliateDetailsSlice';

import SubscriptionForm from './SubscriptionForm';
import StyledTable from '../layout/StyledTableWrap';

import { AffiliateStatementProps } from '@/types/affiliate';
import { SubscriptionFee } from '@/types/subscriptionFee';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. staticStatements in /types/affiliate.ts
  statements: AffiliateStatementProps[];
};

const FeesDetails = ({ statements }: Props) => {
  const dispatch = useAppDispatch();
  const [expand, setExpand] = useState(false);
  const [openMenuNo, setOpenMenuNo] = useState<number>(-1);
  const editSubscriptionFeeId = useAppSelector(getEditSubscriptionFeeId);

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
        TAGX Statements
        <ChevronIcon />
      </h3>
      <div className='togglelable'>
        <div className='box-bg z-10'>
          <StyledTable className={`${leagueDetailStyles.GridContainer} stripped`}>
            <table className='w-full table-auto'>
              <thead className='text-white'>
                <tr>
                  <th className='w-auto text-left'>Payment Date</th>
                  <th className='w-auto text-left'>Amount</th>
                  <th className='w-auto text-left'>Event</th>
                  <th className='w-auto text-left'>Event Type</th>
                  <th className='w-auto text-left'>Description</th>
                  <th className=' w-16 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {statements?.map((statement: AffiliateStatementProps, index) => (
                  <tr className='even:bg-gray-50' key={index}>
                    <td>{moment.unix(parseInt(statement.paymentDate)).format("MM/DD/YYYY")}</td>
                    <td>
                      <div className='flex items-center text-blue-brand'>
                        <div className='capsule gray mr-2 max-w-fit max-h-3'>
                          <RiVisaLine className='text-sm' />
                        </div>
                        ${statement.amount}
                      </div>
                    </td>
                    <td>{statement.event}</td>
                    <td className='text-blue-brand'>
                      <div className={`capsule ${statement.eventType === "open" ? 'green' : 'orange'} mr-2 max-w-min w-7`}>
                        {statement.eventType}
                      </div>
                    </td>
                    <td>{statement.description}</td>
                    <td className='text-center'>
                      <div className="w-full text-right relative pr-3">
                        <button className="inline-flex items-center" onClick={() => setOpenMenuNo(openMenuNo === index ? -1 : index)}>
                          <HiDotsVertical className='m-auto' />
                        </button>
                        <ul className={`float absolute bg-white w-48 text-left right-0 z-10 pb-1 shadow-md rounded-md text-gray-700 pt-1 ${openMenuNo === index ? '' : 'hidden'}`}>
                          <li><a className="hover:bg-white py-2 px-4 block whitespace-no-wrap" href="#">Download Receipt</a></li>
                          <li><a className="hover:bg-white py-2 px-4 block whitespace-no-wrap" href="#">Request a Refund</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className={`${editSubscriptionFeeId === 0 ? '' : 'hidden'}`}>
                  <SubscriptionForm fee={{} as SubscriptionFee} isAdd={true} />
                </tr>
              </tbody>
            </table>
          </StyledTable>
        </div>
      </div>
    </div>
  );
};

export default FeesDetails;
