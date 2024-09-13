import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Incident from './Incident.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'warrior', // roles pueden ser 'warrior', 'admin', etc.
  },
});

// Definir la relación uno a muchos
User.hasMany(Incident, { foreignKey: 'assignedTo', as: 'incidents' });


export default User;
