import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Dashboard = (props: Props) => {
  return <div className='dashboard'>{props.children}</div>;
};

export default Dashboard;
