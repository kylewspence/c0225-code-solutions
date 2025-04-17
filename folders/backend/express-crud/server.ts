import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    // Allow non-SSL traffic to localhost
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());

app.get('/api/grades', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "grades"
    `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    if (isNaN(Number(gradeId))) {
      throw new ClientError(
        404,
        `The grade '${gradeId} does not exist in the database.`
      );
    }

    const sql = `
    select *
    from "grades"
    where "gradeId" = $1
    `;

    const params = [gradeId];
    const results = await db.query(sql, params);
    const grade = results.rows[0];
    if (!grade) {
      throw new ClientError(
        404,
        `Grade ID: ${gradeId} - not found on the specified row.`
      );
    }
    res.status(200).json(results.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/grades', async (req, res, next) => {
  try {
    const { name, course, score } = req.body;
    if (
      !name ||
      !course ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ClientError(
        400,
        'name, course, and a valid score (0-100) are required.'
      );
    }

    const sql = `
    insert into "grades" ("name", "course", "score")
    values ($1, $2, $3)
    returning *;
    `;

    const params = [name, course, score];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    const { name, course, score } = req.body;
    if (isNaN(Number(gradeId))) {
      throw new ClientError(400, `Invalid gradeId: ${gradeId}`);
    }
    if (
      !name ||
      !course ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ClientError(
        400,
        'name, course, and a valid score (0-100) are required.'
      );
    }

    const sql = `
    update "grades"
    set "name" = $1,
        "course" = $2,
        "score" = $3
    where "gradeId" = $4
    returning *;
    `;

    const params = [name, course, score, gradeId];
    const result = await db.query(sql, params);
    const updated = result.rows[0];
    if (!updated) throw new ClientError(404, `Grade: '${gradeId}' not found`);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    if (isNaN(Number(gradeId))) {
      throw new ClientError(400, `Invalid gradeId: ${gradeId}`);
    }

    const sql = `
    delete from "grades"
    where "gradeId" = $1
    returning *;
    `;

    const params = [gradeId];
    const result = await db.query(sql, params);
    const deleted = result.rows[0];
    if (!deleted) throw new ClientError(404, `Grade: '${gradeId}' not found.`);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
