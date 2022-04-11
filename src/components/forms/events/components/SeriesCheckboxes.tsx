import React from 'react';

import styles from './SeriesCheckboxes.module.scss';

import seriesNames from '@/mock-data/seriesNames';

interface CheckBoxGroupProps {
  heading: string;
  items: string[];
}

const defaultProps: CheckBoxGroupProps = {
  heading: 'Additional Events',
  items: seriesNames,
};

// interface listObjectProp {
//     id: number;
//     value: string;
// }
export default function SeriesCheckboxes({
  heading,
  items,
}: CheckBoxGroupProps) {
  // const [isCheckAll, setIsCheckAll] = useState(false);
  // const [checkedItems, setCheckedItems] = useState<listObjectProp[]>([]);
  // const [list, setList] = useState<listObjectProp[]>([]);

  // useEffect(() => {
  //     seriesNames.map((item, i) => {
  //         const newItem: listObjectProp = {
  //             id: i, value: item
  //         }
  //         setList([...list, newItem]);
  //     })
  //   }, [list]);

  const handleSelectAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(items);
    // TODO:
    // const items = list.map(item => {
    //     if (item.id > 3) {
    //         return ({
    //             id: item.id,
    //             value: item.value
    //         } as listObjectProp)
    //     };
    // });
    // console.log('items:...');
    // console.log(items);
    // setCheckedItems([...checkedItems, items]);
    // if (isCheckAll) {
    //    setCheckedItems([]);
    // }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    // setCheckedItems([...checkedItems, e.target.value]);
  };

  return (
    <div className={`${styles.seriesCheckBoxes}`}>
      <h3>{heading}</h3>
      <div className='checkboxes'>
        <div className='col'>
          {seriesNames.slice(0, 6).map((item, i) => (
            <div
              className={`form-check ${i <= 3 ? 'disabled' : 'disabled'}`}
              key={i}
            >
              <input
                value={i}
                className='form-check-input'
                type='checkbox'
                id={`check-${i}`}
                disabled
              />
              <label className='form-check-label' htmlFor={`check-${i}`}>
                {item}
              </label>
            </div>
          ))}
        </div>
        <div className='col'>
          {seriesNames.slice(6, 12).map((item, i) => (
            <div className={`form-check ${i < 3 ? 'disabled' : ''}`} key={i}>
              <input
                value={i}
                className='form-check-input'
                type='checkbox'
                id={`check2-${i}`}
                disabled={i >= 3 ? false : true}
                onChange={handleCheck}
              />
              <label className='form-check-label' htmlFor={`check2-${i}`}>
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button className='btn' onClick={handleSelectAll}>
        Select All
      </button>
    </div>
  );
}

SeriesCheckboxes.defaultProps = defaultProps;
