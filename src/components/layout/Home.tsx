import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Home = (props: Props) => {
  return <div className='home'>{props.children}</div>;
};

export default Home;
