import { products } from './data';

export type Product = {
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  shortDescription: string;
  longDescription: string;
};

export function readCatalog(): Promise<Product[]> {
  return Promise.resolve(products);
}

export function readProduct(productId: number): Promise<Product | undefined> {
  return Promise.resolve(products.find((p) => p.productId === productId));
}
