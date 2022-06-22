import React from 'react'

import StyledTable from '@/components/layout/StyledTableWrap';

import { useAppSelector } from '@/app/hooks';
import { getStaticProps } from '@/features/eventCreation/divisionsSlice';

import { DivisionProps } from '@/types/division';

export default function Expenses() {
  const divisions = useAppSelector(getStaticProps);
  return (
    <StyledTable className='stripped header-1_5'>
      <table className='w-full table-auto'>
        <thead className='text-white'>
          <tr>
            <th className='w-auto text-left'># of Divisions</th>
            <th className='w-auto text-left'># of Pools</th>
            <th></th>
            <th className='w-auto text-left'>4 Teams</th>
            <th className='w-auto text-left'>6 Teams</th>
            <th className='border-tr-2 w-auto text-left'>8 Teams</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division: DivisionProps) => {
            return division.pools.map((pool, id) => (
              <tr className='even:bg-gray-50' key={pool?.id}>
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
              </tr>
            ));
          })}
        </tbody>
      </table>
    </StyledTable>
  )
}
