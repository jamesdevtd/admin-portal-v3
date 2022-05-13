import { useState } from 'react';

import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../features/counter/counterSlice';

const TestState: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  return (
    <Layout>
      <ContentWrap>
        <section className='my-10 mx-auto flex max-w-md flex-col gap-5'>
          <h2 className='text-3xl'>The current number is: {count}</h2>
          <div className='flex flex-col gap-5'>
            <input
              className='rounded-md'
              value={incrementAmount ? incrementAmount : ''}
              onChange={(e) => setIncrementAmount(Number(e.target.value))}
              type='number'
              autoComplete='on'
            />
            <button
              className='bg-blue-brand p-2 text-white'
              onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount)))
              }
            >
              Increment by amount
            </button>
          </div>
          <div className='flex-rpw flex gap-5'>
            <button
              className='bg-blue-start p-3 text-white'
              onClick={() => dispatch(decrement())}
            >
              Decrement by 1
            </button>
            <button
              className='bg-blue-dark p-3 text-white'
              onClick={() => dispatch(increment())}
            >
              Increment by 1
            </button>
          </div>
        </section>
      </ContentWrap>
    </Layout>
  );
};

export default TestState;
