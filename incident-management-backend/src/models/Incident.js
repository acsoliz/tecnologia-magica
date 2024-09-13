import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Incident = sequelize.define('Incident', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'OPEN', // valores pueden ser 'OPEN', 'CLOSED'
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'MEDIUM', // valores pueden ser 'LOW', 'MEDIUM', 'HIGH'
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },  
  },
});

(async () => {
  const { default: User } = await import('./User.js');
  Incident.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedUser' });
})();



export default Incident;
