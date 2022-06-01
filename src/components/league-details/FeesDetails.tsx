import { useState } from 'react';
import { HiOutlinePencilAlt, HiPlus } from 'react-icons/hi';

import styles from '../events/EventsTable.module.scss';
import tabStyles from './AffiliateDetails.module.scss';

import { DivisionProps } from '@/types/division';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  divisions: DivisionProps[];
};

const FeesDetails = ({ divisions }: Props) => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`${tabStyles['tab-container']} ${tabStyles.affiliate} ${
        expand ? tabStyles['expanded'] : tabStyles['collapsed']
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
        <div className='box-bg'>
          <div className={styles.Grid}>
            <div className='card-bg mx-6 mb-3 rounded-lg'>
              <table className='w-full table-auto'>
                <thead className='text-white'>
                  <tr>
                    <th className='w-auto'>Fee Amount</th>
                    <th className='w-auto'>Country</th>
                    <th className='w-auto'>State</th>
                    <th className='w-auto'>Valid From</th>
                    <th className='w-auto'>Valid To</th>
                    <th className='w-auto'>Created by</th>
                    <th className='w-auto'>Created Date</th>
                    <th className='w-auto'>Changed by</th>
                    <th className='w-auto'>Date Changed</th>
                    <th className='w-auto'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$60</td>
                    <td>United States</td>
                    <td>NY</td>
                    <td>02/01/22</td>
                    <td>-</td>
                    <td>Sarah Taylor</td>
                    <td>02/01/22</td>
                    <td>Sarah Taylor</td>
                    <td>02/01/22</td>
                    <td>
                      <button>
                        <HiOutlinePencilAlt className='text-xl text-gray-light' />
                      </button>
                    </td>
                  </tr>
                  {/* {fee.map((event: any) => (
                    <tr key={event?.id}>
                      <td><span className="tag capsule">open</span></td>
                      <td className="uppercase font-bold"><a className="text-blue-brand hover:text-blue-600" href="#">{event?.name}</a></td>
                      <td className="uppercase font-bold"><a className="text-blue-brand hover:text-blue-600" href="#">{event?.series?.name}</a></td>
                      <td><CircleFlag countryCode="us" className="h-4" /></td>
                      <td>{event?.series?.id}</td>
                      <td>09/14/2021</td>
                      <td>FREE - $25</td>
                      <td><span className={`rounded-full px-3 w-20 block text-center text-white capitalize ${event?.status === 'closed' ? 'bg-red-warning' : event?.status === 'open' ? 'bg-blue-brand' : 'bg-orange'}`}>{event?.status}</span></td>
                      <td>Edwin Flack Avenue, Sydney Olympic Park, 2127</td>
                      <td>Men’s, Mixed, Women’s, Youth</td>
                      <td>{event?.teams}</td>
                      <td><button><HiOutlinePencilAlt className="text-xl text-gray-light" /></button></td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className='my-2 flex w-full items-center pl-9 text-sm text-blue-brand hover:text-blue-start'>
          Add custom League Subscription Fee <HiPlus />
        </button>
      </div>
      <div className='togglelable'>
        <div className='my-2 w-full pl-6 text-md text-gray-brand'>
          Subscription Fee
        </div>
        <div className='my-2 w-full pl-12 text-md text-blue-dark'>
          Platform Fee Per Division |{' '}
          <span className='font-bold'>Adult Competitive</span>
        </div>
        <div className='box-bg'>
          <div className={styles.Grid}>
            <div className='card-bg row-2 mx-6 mb-3 rounded-lg'>
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
                        <td>{id === 0 ? division.divisionType : ''}</td>
                        <td>{pool.name}</td>
                        <td className='text-blue-brand'>
                          <div className='block rounded-full bg-gray-200 px-1 text-center uppercase text-blue-dark'>
                            USD
                          </div>
                        </td>
                        <td className='text-blue-brand'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='text-blue-brand'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='text-blue-brand'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='text-blue-brand'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='text-blue-brand'>
                          ${division.playerFee?.fee}
                        </td>
                        <td className='text-blue-brand'>
                          ${division.playerFee?.fee}
                        </td>
                        <td>
                          <button>
                            <HiOutlinePencilAlt className='text-xl text-gray-light' />
                          </button>
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesDetails;
