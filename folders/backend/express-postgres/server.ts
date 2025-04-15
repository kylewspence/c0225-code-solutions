import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';

import pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat);

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
        "actorId",
        "firstName",
        "lastName"
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
      SELECT "filmId", "title", "replacementCost"
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
    const sql = `
      SELECT "filmId", "title", "description"
      FROM "films"
      WHERE "filmId" = $1;
    `;
    const result = await db.query(sql, [filmId]);
    const film = result.rows[0];
    if (!film) {
      res.status(404).send(`Film with id ${filmId} not found`);
      return;
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
      res.status(400).send('Missing title query param');
      return;
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
      res.status(404).send(`Film with id ${filmId} not found`);
      return;
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
