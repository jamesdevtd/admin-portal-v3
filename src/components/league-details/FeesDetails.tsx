import moment from 'moment';
import { useState } from 'react';
import { HiOutlinePencilAlt, HiPlus } from 'react-icons/hi';
import { RiVisaLine } from 'react-icons/ri';

import tabStyles from './AffiliateDetails.module.scss';
import leagueDetailStyles from './LegueDetails.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEditAffiliateFeeId, getEditAffiliateFeePoolId, getEditSubscriptionFeeId, setEditAffiliateFeeId, setEditSubscriptionFeeId } from '@/features/affiliateDetails/affiliateDetailsSlice';

import AffiliateForm from './AffiliateForm';
import SubscriptionForm from './SubscriptionForm';
import StyledTable from '../layout/StyledTableWrap';

import { DivisionProps } from '@/types/division';
import { SubscriptionFee } from '@/types/subscriptionFee';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  divisions: DivisionProps[];
  fees: SubscriptionFee[] | null;
};

const FeesDetails = ({ divisions, fees }: Props) => {
  const dispatch = useAppDispatch();
  const [expand, setExpand] = useState(false);
  const editSubscriptionFeeId = useAppSelector(getEditSubscriptionFeeId);
  const editAffiliateFeeId = useAppSelector(getEditAffiliateFeeId);
  const editAffiliateFeePoolId = useAppSelector(getEditAffiliateFeePoolId);

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
        Fees
        <ChevronIcon />
      </h3>
      <div className='togglelable'>
        <div className='my-2 w-full pl-6 text-md text-gray-brand'>
          Subscription Fee
        </div>
        <div className='box-bg z-10'>
          <StyledTable className={`${leagueDetailStyles.GridContainer} header-1_5`}>
            <table className='w-full table-auto'>
              <thead className='text-white'>
                <tr>
                  <th className='w-auto text-left'>Fee Amount</th>
                  <th className='w-auto text-left'>Country</th>
                  <th className='w-auto text-left'>State</th>
                  <th className='w-auto text-left'>Valid From</th>
                  <th className='w-auto text-left'>Valid To</th>
                  <th className='w-auto text-left'>Created by</th>
                  <th className='w-auto text-left'>Created Date</th>
                  <th className='w-auto text-left'>Changed by</th>
                  <th className='w-auto text-left'>Date Changed</th>
                  <th className='w-auto text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees?.map((fee: SubscriptionFee) => (
                  <tr key={fee?.id}>
                    {editSubscriptionFeeId === fee.id ? (
                      <SubscriptionForm fee={fee} isAdd={false} />
                    ) : (
                      <>
                        <td className='flex items-center'><RiVisaLine className='capsule gray mr-2' /> ${fee.feeAmount}</td>
                        <td>{fee.country}</td>
                        <td>{fee.state}</td>
                        <td>{moment(fee.validFrom).format("MM/DD/YYYY")}</td>
                        <td>{fee.validTo ? moment(fee.validTo).format("MM/DD/YYYY") : '-'}</td>
                        <td>{`${fee.createdBy.firstName} ${fee.createdBy.lastName}`}</td>
                        <td>{moment(fee.createdDate).format("MM/DD/YYYY")}</td>
                        <td>{`${fee.changedBy.firstName} ${fee.changedBy.lastName}`}</td>
                        <td>{moment(fee.changedDate).format("MM/DD/YYYY")}</td>
                        <td>
                          <button type="button" onClick={() => dispatch(setEditSubscriptionFeeId({ id: fee.id }))}>
                            <HiOutlinePencilAlt className='text-xl text-gray-light' />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className={`${editSubscriptionFeeId === 0 ? '' : 'hidden'}`}>
                  <SubscriptionForm fee={{} as SubscriptionFee} isAdd={true} />
                </tr>
              </tbody>
            </table>
          </StyledTable>
        </div>
        <button className='my-2 flex items-center pl-9 text-sm text-blue-brand hover:text-blue-start' onClick={() => dispatch(setEditSubscriptionFeeId({ id: 0 }))}>
          Add custom League Subscription Fee <HiPlus />
        </button>
      </div>
      <div className='togglelable'>
        <div className='my-2 w-full pl-6 text-md text-gray-brand'>
          Affiliate Fee
        </div>
        <div className='my-2 w-full pl-12 text-md text-blue-dark'>
          Platform Fee Per Division |{' '}
          <span className='font-bold'>Adult Competitive</span>
        </div>
        <div className='box-bg'>
          <StyledTable className={`${leagueDetailStyles.GridContainer} stripped header-2`}>
            <table className='w-full table-auto'>
              <thead className='text-white'>
                <tr>
                  <th colSpan={2}></th>
                  <th colSpan={4} className='border-br-2 w-auto text-center'>
                    4 Teams
                  </th>
                  <th colSpan={2} className='border-br-2 w-auto text-center'>
                    PRO SERIES
                  </th>
                  <th className='w-auto text-center'>RWCQ</th>
                  <th></th>
                </tr>
                <tr>
                  <th className='w-auto text-left'>Divisions</th>
                  <th className='w-auto text-left'>Pools</th>
                  <th></th>
                  <th className='w-auto text-left'>4 Teams</th>
                  <th className='w-auto text-left'>6 Teams</th>
                  <th className='border-tr-2 w-auto text-left'>8 Teams</th>
                  <th className='w-auto text-left'>Sanctioned</th>
                  <th className='border-tr-2 w-auto text-left'>
                    Non Sanctioned
                  </th>
                  <th className='w-auto text-center'>-</th>
                  <th className='w-auto text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {divisions.map((division: DivisionProps) => {
                  return division.pools.map((pool, id) => (
                    <tr className='even:bg-gray-50' key={pool?.id}>
                      {editAffiliateFeeId === division.id && editAffiliateFeePoolId === pool.id ? (
                        <AffiliateForm division={division} isAdd={false} />
                      ) : (<>
                        <td className='!font-semibold'>{id === 0 ? division.divisionType : ''}</td>
                        <td className='!font-semibold'>{pool.name}</td>
                        <td className='!text-blue-brand !font-semibold'>
                          <div className='block rounded-full bg-gray-200 px-1 text-center uppercase text-blue-dark'>
                            USD
                          </div>
                        </td>
                        <td className='!text-blue-brand !font-semibold'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='!text-blue-brand !font-semibold'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='!text-blue-brand !font-semibold'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='!text-blue-brand !font-semibold'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='!text-blue-brand !font-semibold'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='!text-blue-brand !font-semibold'>
                          ${division.playerFee?.fee}
                        </td>
                        <td>
                          <button type="button" onClick={() => dispatch(setEditAffiliateFeeId({ id: division.id, poolId: pool.id }))}>
                            <HiOutlinePencilAlt className='text-xl text-gray-light' />
                          </button>
                        </td>
                      </>)}
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </StyledTable>
        </div>
      </div>
    </div>
  );
};

export default FeesDetails;
