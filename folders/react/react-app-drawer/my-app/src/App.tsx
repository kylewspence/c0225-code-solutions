import { Route, Routes } from 'react-router-dom';
import { About } from './pages/About';
import { Catalog } from './pages/Catalog';
import { NotFound } from './pages/NotFound';
import { ProductDetails } from './pages/ProductDetails';
import { AppDrawer } from './components/AppDrawer';

export const menuItems = [
  { name: 'About', iconUrl: '/hylian-emblem.svg', path: '/about' },
  { name: 'Catalog', iconUrl: '/catalog.png', path: '/' },
  { name: 'Vite', iconUrl: '/vite.svg', path: '/' },
  { name: 'React', iconUrl: '/react.svg', path: '/' },
];

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppDrawer menuItems={menuItems} />}>
        <Route index element={<Catalog />} />
        <Route path="details/:productId" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
