
import { useEffect, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import styles from './League.module.scss';

// TO-DO need to create common style/component for grid.
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';
import StyledTableWrap from '@/components/layout/StyledTableWrap';
import SearchBar from '@/components/leagues';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getFilters, updateFilters } from '@/features/leaguesListing/leaguesFiltersSlice';
import { getLeaguesList } from '@/features/leaguesListing/leaguesList';

import { LeagueProps } from '@/types/league';

import BaseBallIcon from '~/svg/baseball.svg';
import LeftArrow from '~/svg/left-arrow.svg';
import RightArrow from '~/svg/right-arrow.svg';
import SearchIcon from '~/svg/search-icon.svg';


export default function League() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFilters);
  const leagues = useAppSelector(getLeaguesList);
  const [search, setSearch] = useState<string>('');

  const [filteredLeagues, setFilteredLeagues] = useState([]);
  useEffect(() => {
    const filtered: any = leagues.filter((f: any) => {
      if (
        (filters.search === "" || f.leagueName.indexOf(filters?.search) > -1) &&
        (filters.status === 'all' || f.status === filters?.status?.toLowerCase()) &&
        (filters.country === 'all' || f.country === filters?.country?.toLowerCase()) &&
        ((filters.isPro === true && f.isSanctioned === true) || filters.isPro === false) &&
        ((filters.isNonPro === true && f.isSanctioned === false) || filters.isNonPro === false) &&
        ((filters.championshipQualifier === true && f.championshipQualifier === true) || filters.championshipQualifier === false)
      )
        return f;
    });
    setFilteredLeagues(filtered);
  }, [filters])


  const changeSearch = () => {
    dispatch(updateFilters(({ filters: { search: search } })));
  }

  return (
    <div className="page-event">
      <Layout>
        <ContentWrap className={styles.League}>
          <header className='content-header'>
            <BaseBallIcon />
            <h2>Leagues</h2>
            <div className='flex items-center ml-auto w-80'>
              <label className="relative block rounded-md w-full">
                <span className="sr-only">Search</span>
                <input onChange={(e) => setSearch(e.target.value)} className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-3 pr-9 shadow-sm focus:outline-none focus:border-blue-brand focus:ring-blue-brand focus:ring-1 sm:text-sm" placeholder="Search by League or Affiliate Name here" type="text" name='search' />
                <button className="absolute inset-y-0 right-0 flex items-center px-3 m-0.5 rounded-md bg-blue-brand hover:bg-blue-start" type='button' onClick={changeSearch}>
                  <SearchIcon className="h-4 w-5 fill-slate-300" />
                </button>
              </label>
            </div>
          </header>

          <div className='content-main'>
            <div className="inner-content">
              <SearchBar />
              <div className="card-bg mb-3 mx-6 rounded-lg">
                <StyledTableWrap>
                  <table className="table-auto w-full">
                    <thead className='text-white'>
                      <tr>
                        <th className="w-auto text-left pl-3">Name</th>
                        <th className="w-auto text-left">Status</th>
                        <th className="w-auto text-left">Country</th>
                        <th className="w-auto text-left">Affiliate</th>
                        <th className="w-auto text-left">Total Events</th>
                        <th className="w-auto text-left">Next Event</th>
                        <th className="w-auto text-left">Total Staff</th>
                        <th className="w-auto text-left">Custom Fees?</th>
                        <th className="w-auto text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeagues?.map((league: LeagueProps) => {
                        let league_status = '';
                        switch (league.status.toLowerCase()) {
                          case 'active': league_status = 'bg-blue-brand text-white'; break;
                          case 'pending': league_status = 'bg-orange text-white'; break;
                          case 'inactive': league_status = 'bg-white border-2 border-gray-brand text-gray-brand '; break;
                          case 'blocked': league_status = 'bg-white border-2 border-red-warning text-red-warning'; break;

                          default: league_status = 'bg-blue-brand'; break;
                        }
                        return (
                          <tr key={league.id}>
                            <td className="flex items-center">
                              <img className="h-5 mr-1" src="/images/mock/logo-thumb.png" alt="Event Logo" />
                              {league.leagueName}
                            </td>
                            <td>
                              <span
                                className={`rounded-full px-3 py-1 w-20 block text-center capitalize ${league_status}`}>
                                {league.status}
                              </span>
                            </td>
                            <td><CircleFlag countryCode={league.country.toLowerCase()} className='h-4' /></td>
                            <td><button className='text-blue-brand hover:text-blue-600 font-bold'>{league.affiliateName}</button></td>
                            <td>{league.totalEvents}</td>
                            <td>{league.nextEvent}</td>
                            <td>{league.totalStaff}</td>
                            <td className='capitalize'>{league.customFees}</td>
                            <td><button><HiOutlinePencilAlt className="text-xl text-gray-light" /></button></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className='grid-footer'>
                    <div className='flex'>
                      <ul className='flex w-fit'>
                        <li><button className='h-7 w-7 px-2 py-2 hover:bg-gray-100 rounded-md'><LeftArrow className='h-3 pt-1' /></button></li>
                        <li><button className='h-7 w-7 px-2 py-2 hover:bg-gray-100 rounded-md'><FaAngleLeft className='h-3 pt-1' /></button></li>
                        <li><button className='h-8 px-2 py-2 hover:bg-gray-100 rounded-md text-xxs'>1</button></li>
                        <li><button className='h-8 px-2 py-2 hover:bg-gray-100 rounded-md text-xxs'>2</button></li>
                        <li><button className='h-8 px-2 py-2 hover:bg-gray-100 rounded-md text-xxs'>3</button></li>
                        <li><button className='h-8 px-2 py-2 hover:bg-gray-100 rounded-md text-xxs'>4</button></li>
                        <li><button className='h-7 w-7 px-2 py-2 hover:bg-gray-100 rounded-md'><FaAngleRight className='h-3 pt-1' /></button></li>
                        <li><button className='h-7 w-7 px-2 py-2 hover:bg-gray-100 rounded-md'><RightArrow className='h-3 pt-1' /></button></li>
                      </ul>

                      <ul className='flex items-center w-fit ml-auto gap-3'>
                        <li>Showing 1-10 Referees of 5</li>
                        <li>Listings per Page</li>
                        <li className='text-blue-dark font-bold text-md flex items-center'>
                          <select defaultValue={10} className="w-14 mr-3 rounded-md">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                </StyledTableWrap>

              </div>

            </div>
          </div>
        </ContentWrap>

      </Layout>
    </div>
  );
}

