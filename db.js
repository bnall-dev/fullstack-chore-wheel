const pg = require('pg');
const format = require('pg-format');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/chore_wheel'
);

client.connect();

const sync = async () => {
  const SQL = `
  DROP TABLE IF EXISTS roommate_chores;
  DROP TABLE IF EXISTS roommates;
  DROP TABLE IF EXISTS chores;

  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE roommates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR UNIQUE NOT NULL
  );


  CREATE TABLE chores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL
  );


  CREATE TABLE roommate_chores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "roommateId" UUID NOT NULL REFERENCES roommates(id),
    "choreId" UUID NOT NULL REFERENCES chores(id),
    "isDone" BOOLEAN DEFAULT false
  );
  `;
  await client.query(SQL);
};

// ROOMMATES REQUESTS
const readRoommates = async () => {
  return (await client.query('SELECT * FROM roommates')).rows;
};
const readRoommate = async id => {
  const SQL = 'SELECT * FROM roommates WHERE id = $1';
  const response = await client.query(SQL, [id]);
};
const createRoommate = async rm => {
  const SQL = 'INSERT INTO roommates (name) VALUES ($1) RETURNING *';
  const response = await client.query(SQL, [rm.name]);
  return response.rows[0];
};
const updateRoommate = async rm => {
  const SQL = 'UPDATE roommates SET name = $1  WHERE id=$2 RETURNING *';
  const response = await client.query(SQL, [rm.name, rm.id]);
  return response.rows[0];
};
const deleteRoommate = async id => {
  const SQL = `DELETE FROM roommates WHERE id=$1`;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

// CHORES REQUESTS
const readChores = async () => {
  return (await client.query('SELECT * FROM chores')).rows;
};
const readChore = async id => {
  const SQL = 'SELECT * FROM chores WHERE id = $1';
  const response = await client.query(SQL, [id]);
};
const createChore = async chore => {
  const SQL = 'INSERT INTO chores (name) SELECT ($1) RETURNING *';
  const response = await client.query(SQL, [chore.name]);
  return response.rows[0];
};
const updateChore = async chore => {
  const SQL = 'UPDATE chores SET name = $1  WHERE id=$2 RETURNING *';
  const response = await client.query(SQL, [chore.name, chore.id]);
  return response.rows[0];
};
const deleteChore = async id => {
  const SQL = `
  DELETE FROM chores WHERE id=$1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

// ROOMMATE CHORES REQUESTS
const readRoommateChores = async () => {
  const SQL = 'SELECT * FROM roommate_chores';
  const response = await client.query(SQL);
  return response.rows;
};
const readRoommateChore = async id => {
  const SQL = 'SELECT * FROM roommate_chores WHERE id = $1';
  const response = await client.query(SQL, [id]);
};
const createRoommateChores = async mappings => {
  console.log(mappings);
  const formattedMapping = mappings.map(m => [m.roommateId, m.choreId]);
  const createSQL = `DELETE FROM roommate_chores;
    INSERT INTO roommate_chores ("roommateId", "choreId") VALUES %L RETURNING *`;
  const sql = format(createSQL, formattedMapping);
  const response = await client.query(sql);
  return response;
};
const updateRoommateChore = async roommateChore => {
  const SQL =
    'UPDATE roommate_chores SET "roommateId" = $1, "choreId" = $2, "isDone" = $3  WHERE id=$4 RETURNING *';
  const response = await client.query(SQL, [
    roommateChore.roommateId,
    roommateChore.choreId,
    roommateChore.isDone,
    roommateChore.id,
  ]);
  return response.rows[0];
};

const deleteRoommateChores = async id => {
  const SQL = 'DELETE FROM roommate_chores';
  const response = await client.query(SQL);
  return response.rows;
};

const deleteRoommateChore = async id => {
  const SQL = 'DELETE FROM roommate_chores WHERE id=$1';
  const response = await client.query(SQL, [id]);
  return response.rows;
};

module.exports = {
  sync,
  readRoommates,
  readRoommate,
  createRoommate,
  updateRoommate,
  deleteRoommate,
  readChores,
  readChore,
  createChore,
  updateChore,
  deleteChore,
  readRoommateChores,
  readRoommateChore,
  createRoommateChores,
  updateRoommateChore,
  deleteRoommateChores,
  deleteRoommateChore,
};
