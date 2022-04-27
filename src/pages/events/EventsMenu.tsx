import { useEffect, useState } from 'react';

import eventsMenuItems from '@/static/eventsMenuItems';

import CheckIcon from '~/icons/white-check.svg';
interface MenuSubItems {
  icon: string;
  label: string;
  url: string;
}
interface MenuItems {
  heading: string;
  items: MenuSubItems[];
}

type Props = {
  currentStep: number;
  handleNextStep: (val: number) => void;
}
export default function EventsMenu({ currentStep, handleNextStep }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);

  useEffect(() => {
    setMenuItems(eventsMenuItems);
  }, []);

  return (
    <div className='nav'>
      {menuItems &&
        menuItems.map((group, i) => (
          <div key={i}>
            <ul>
              {group.items &&
                group.items.map((item, i) => {
                  let className = i > 3 ? 'inactive ' : 'active ';
                  className += (i === currentStep) ? 'current ' : ' ';
                  className += (currentStep > i) ? 'checked ' : ' ';
                  return (
                    <li key={i} className={className}>
                      <div className='wrap' onClick={() => handleNextStep(i)}>
                        <div className={`icon-box ${item.icon}`}>
                          {currentStep > i ?
                            <CheckIcon /> :
                            (i + 1)
                          }
                        </div>
                        <span>{item.label}</span>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
    </div>
  );
}
