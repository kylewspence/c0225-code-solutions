import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div className="w-screen min-h-screen text-white py-8">
      <nav className="px-4 text-white bg-gray-900">
        <ul>
          <li className="inline-block py-2 px-4">
            <Link to="/about" className="text-white">
              About
            </Link>
          </li>
          <li className="inline-block py-2 px-4">
            <Link to="/" className="text-white">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
}
