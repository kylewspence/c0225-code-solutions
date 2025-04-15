import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';

import pg from 'pg';

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/pagila',
  ssl: { rejectUnauthorized: false },
});

const app = express();

app.get('/api/actors/:actorId', async (req, res, next) => {
  try {
    const { actorId } = req.params;
    if (actorId === undefined) {
      throw new ClientError(400, 'actorId is required');
    }
    const sql = `
      select
        *
      from "actors"
      where "actorId" = $1;
    `;
    const params = [actorId];
    const result = await db.query(sql, params);
    const actor = result.rows[0];
    if (!actor) {
      throw new ClientError(404, `actor ${actorId} not found`);
    }
    res.send(actor);
  } catch (err) {
    next(err);
  }
});

app.get('/api/films', async (req, res, next) => {
  try {
    const sql = `
      SELECT *
      FROM "films"
      ORDER BY "replacementCost" DESC;
    `;
    const result = await db.query(sql);
    res.send(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/films/:filmId', async (req, res, next) => {
  try {
    const { filmId } = req.params;
    if (!Number(filmId)) {
      throw new ClientError(400, `filmId must be a positive integer`);
    }
    const sql = `
      SELECT *
      FROM "films"
      WHERE "filmId" = $1;
    `;
    const result = await db.query(sql, [filmId]);
    const film = result.rows[0];
    if (!film) {
      throw new ClientError(404, `Film with id ${filmId} not found`);
    }
    res.send(film);
  } catch (err) {
    next(err);
  }
});

app.put('/api/films/:filmId', async (req, res, next) => {
  try {
    const { filmId } = req.params;
    const { title } = req.query;

    if (!title) {
      throw new ClientError(400, 'Missing title query param');
    }

    const sql = `
      UPDATE "films"
      SET "title" = $1
      WHERE "filmId" = $2
      RETURNING *;
    `;
    const result = await db.query(sql, [title, filmId]);
    const updatedFilm = result.rows[0];

    if (!updatedFilm) {
      throw new ClientError(404, `Film with id ${filmId} not found`);
    }

    res.send(updatedFilm);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
