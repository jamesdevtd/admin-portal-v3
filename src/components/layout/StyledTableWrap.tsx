import React from 'react'

import styles from '@/components/tables/StyledTable.module.scss';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
  className?: string;
};

export const StyledTable = (props: Props) => {
  return (
    <div className={`${styles.StyledTable} ${props?.className ?? ''}`}>
      <div className="behind"></div>
      <div className="front"></div>
      {props.children}
    </div>
  )
}

export default StyledTable;