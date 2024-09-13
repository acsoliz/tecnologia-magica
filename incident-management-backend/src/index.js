import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import User from './models/User.js'; 
import Incident from './models/Incident.js';
import cors from 'cors'
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

sequelize.sync().then(() => {
  console.log('Connected to the database');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
