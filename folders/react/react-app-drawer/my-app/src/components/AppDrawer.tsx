import { FaBars } from 'react-icons/fa';
import { menuItems } from '../App';

export function AppDrawer() {
  return (
    <div className="app-container">
      <div className="sidebar">
        Hylian Shopping
        <button className="toggle-button">
          <FaBars />
        </button>
        <ul className="menu">
          {menuItems.map((item) => (
            <li key={item.name}>
              <img src={item.iconUrl} alt={item.name} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="page-content">[Outlet goes here]</div>
    </div>
  );
}
