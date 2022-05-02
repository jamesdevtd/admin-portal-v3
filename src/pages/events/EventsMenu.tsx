import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getCurrentStep, setCurrentStep } from '@/features/eventCreation/eventCreationSlice';
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

export default function EventsMenu() {

  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(getCurrentStep);

  const handleSetStep = (val: number) => {
    dispatch(setCurrentStep(val));
  }

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
                  ++i;
                  let className = i > 3 ? 'inactive ' : 'active ';
                  className += (i === currentStep) ? 'current ' : ' ';
                  className += (currentStep > i) ? 'checked ' : ' ';
                  return (
                    <li key={i} className={className}>
                      <div className='wrap' onClick={() => handleSetStep(i)}>
                        <div className={`icon-box ${item.icon}`}>
                          {currentStep > i ?
                            <CheckIcon /> :
                            i
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
