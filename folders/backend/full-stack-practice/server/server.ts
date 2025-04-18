import 'dotenv/config';
import pg from 'pg';
import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "products"
        order by "productId"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/details/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!Number(productId)) {
      throw new ClientError(
        400,
        'Product is required to be a positive integer'
      );
    }

    const sql = `
      select * from "products"
         WHERE "productId" = $1;
`;

    const params = [productId];
    const result = await db.query(sql, params);
    const product = result.rows[0];
    if (!product) {
      throw new ClientError(404, `Product ID ${productId} not found`);
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
