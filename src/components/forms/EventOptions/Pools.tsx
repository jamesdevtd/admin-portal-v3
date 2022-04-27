import React from 'react';

import PoolEditor from './PoolEditor';

import { PoolItemProps } from '@/types/division';

type Props = {
  pools: PoolItemProps[],
  setPoolItems: React.Dispatch<React.SetStateAction<PoolItemProps[]>>,
}

export default function Pools({ pools, setPoolItems }: Props) {

  const handleAddPool = (val: PoolItemProps) => {
    console.log('handleAddPool: ', val);
    // setPoolItems
  }
  const handleUpdatePool = (val: PoolItemProps) => {
    console.log('handleUpdatePool: ', val);
    // setPoolItems
  }

  return (
    <div className="items pool-items">
      {pools.map((item, i) =>
        <PoolEditor
          key={i}
          itemIndex={Number(i)}
          poolItem={item}
          handleUpdatePool={handleUpdatePool}
        // setIsEdited={setIsEdited}
        />
      )}
    </div>
  );
}