import { pool } from '../config/db.js';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0];
};

export const createUser = async (nombre, correo , contraseña) => {
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, correo , contraseña) VALUES ($1, $2,$3) RETURNING *',
    [nombre, correo , contraseña]
  );
  return result.rows[0];
};

export const updateUser = async (id, nombre, correo , contraseña) => {
  const result = await pool.query(
    'UPDATE usuarios SET nombre = $1, correo = $2 ,contraseña = $3 WHERE id = $4 RETURNING *',
    [nombre, correo, contraseña, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
};

