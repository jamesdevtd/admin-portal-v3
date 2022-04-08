import styles from '@/components/layout/Dashboard.module.scss';

import BottomWhiteCurve from '~/svg/bottom-white-curve.svg';

type Props = {
  children: React.ReactNode;
};

const Dashboard = (props: Props) => {
  return (
    <div className={`${styles.dashboardLayout}`}>
      <div className='wall-bg wall-blue-gradient'>
        <BottomWhiteCurve />
      </div>

      {props.children}
    </div>
  );
};

export default Dashboard;
