import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Outlet, NavLink } from 'react-router-dom';
import './AppDrawer.css';

export type MenuItem = {
  name: string;
  iconUrl: string;
  path: string;
};

type Props = {
  menuItems: MenuItem[];
};

export function AppDrawer({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex w-full">
      <div className={`menu-drawer ${isOpen ? 'open' : ''}`}>
        <FaBars className="menu-icon text-black" onClick={handleToggle} />
        {isOpen && <h3 className="menu-heading">Hylian Shopping</h3>}
        <ul className="menu-items">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path} className="menu-item">
                <img src={item.iconUrl} alt={item.name} className="menu-icon" />
                {isOpen && (
                  <span className="menu-label text-black">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
