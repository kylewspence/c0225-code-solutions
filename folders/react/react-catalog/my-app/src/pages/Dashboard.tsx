import { useEffect, useState } from 'react';
import { type Product, readCatalog } from '../lib/read';
import { Link } from 'react-router-dom';
import { toDollars } from '../lib/to-dollars';

export function Dashboard() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadItems() {
      try {
        const values = await readCatalog();
        setItems(values);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadItems();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container">
        <h1>Dashboard</h1>
        <hr className="py-1" />
        <div className="flex flex-wrap">
          {items?.map((item) => (
            <div
              key={item.productId}
              className="w-full md:w-1/2 lg:w-1/3 pr-4 pl-4">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: Product }) {
  return (
    <div className="aspect-[4/5]">
      <Link
        to={`/details/${item.productId}`}
        className="h-full flex flex-col overflow-hidden hover:shadow-g transition">
        <div className="flex-grow overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4">
          <h5 className="text-lg font-bold mb-1 text-indigo-500">
            {item.name}
          </h5>
          <p className="text-sm font-semibold">{toDollars(item.price)}</p>
          <p className="text-sm text-gray-500 mb-1">{item.shortDescription}</p>
        </div>
      </Link>
    </div>
  );
}
