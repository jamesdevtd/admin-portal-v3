import Link from 'next/link';
import { useEffect, useState } from 'react';

import eventsMenuItems from '@/mock-data/eventsMenuItems';

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
                group.items.map((item, i) => (
                  <li
                    key={i}
                    className={`${i > 3 ? 'inactive' : 'active'} ${
                      i < 1 ? 'current' : ''
                    }`}
                  >
                    <Link href={item.url}>
                      <a>
                        <div className={`icon-box ${item.icon}`}>{++i}</div>
                        <span>{item.label}</span>
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
