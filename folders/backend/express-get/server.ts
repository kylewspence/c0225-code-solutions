import express from 'express';
import pg from 'pg';
import { errorMiddleware, ClientError } from './lib/index.js';

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/pagila',
  ssl: {
    // Allow non-SSL traffic to localhost
    rejectUnauthorized: false,
  },
});

const app = express();

app.get('/api/countries', async (req, res, next) => {
  try {
    const sql = `
    SELECT "countryId", "countries"."name", count("cityId") as "cities"
    FROM "countries"
    JOIN "cities" using ("countryId")
    GROUP by "countryId", "countries"."name"
    ORDER by "name";
`;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/countries/:cityId', async (req, res, next) => {
  try {
    const { cityId } = req.params;
    if (!Number(cityId)) {
      throw new ClientError(400, 'cityId is required');
    }

    const sql = `
     select
        *
      from "cities"
      where "cityId" = $1;
    `;

    const params = [cityId];
    const result = await db.query(sql, params);
    const city = result.rows[0];
    if (!city) {
      throw new ClientError(404, `City ID ${cityId} not found`);
    }
    res.json(city);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
