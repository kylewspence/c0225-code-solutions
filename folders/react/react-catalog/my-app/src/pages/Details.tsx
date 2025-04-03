import { useEffect, useState } from 'react';
import { type Product, readProduct } from '../lib/read';
import { useParams, useNavigate } from 'react-router-dom';
import { toDollars } from '../lib/to-dollars';

type Params = {
  itemId: string;
};

export function Details() {
  const { itemId } = useParams<Params>();
  const [item, setItem] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadItem(itemId: number) {
      try {
        const item = await readProduct(itemId);
        setItem(item);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (itemId) {
      setIsLoading(true);
      loadItem(+itemId);
    } else {
      setIsLoading(false);
    }
  }, [itemId]);

  const handleAddToCart = () => {
    alert(`Success! ${name} added to cart.`);
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !item) {
    return (
      <div>
        Error Loading Item {itemId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }
  const { name, longDescription, imageUrl, price, shortDescription } = item;
  return (
    <div className="container text-gray-800 mt-8">
      <div className="flex flex-col">
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:w-1/2 md:w-2/5 pt-2 px-4">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-80 object-contain"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-3/5 px-4">
            <h2 className="font-bold">{name}</h2>
            <p className="font-bold">{toDollars(price)}</p>
            <p className="whitespace-pre-wrap">{shortDescription}</p>
          </div>
        </div>
        <div className="px-4">
          <p className="whitespace-pre-wrap">{longDescription}</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 p-2 bg-blue-500 text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
