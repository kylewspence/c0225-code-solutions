import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toDollars } from '../lib/to-dollars';

export type Product = {
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  shortDescription: string;
  longDescription: string;
};

type Params = {
  productId: string;
};

export function Details() {
  const { productId } = useParams<Params>();
  const [item, setItem] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch(`/api/details/${productId}`);
        if (!res.ok) throw new Error(`Fetch Failed: ${res.status}`);
        const data = (await res.json()) as Product;
        setItem(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadItems();
  }, [productId]);

  const handleAddToCart = () => {
    alert('Product added to cart!');
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !item) {
    return (
      <div>
        Error Loading Item {productId}:{' '}
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
