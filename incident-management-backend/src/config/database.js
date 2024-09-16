// src/config//database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
});

export default sequelize;
