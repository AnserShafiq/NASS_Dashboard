import { Pool } from 'pg';

const pool = new Pool({
  user: 'neondb_owner',
  password: '1okqeFnmIf9h',
  host: 'ep-quiet-cell-a43nlz35-pooler.us-east-1.aws.neon.tech',
  // port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: 'neondb',
});

// Create the images table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    data BYTEA NOT NULL,
    content_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery).catch(console.error);

export { pool };