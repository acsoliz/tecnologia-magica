import { Op } from 'sequelize';
import Incident from '../models/Incident.js';
import User from '../models/User.js';


export async function getAllIncidents(req, res) {
  // Paginación
  const { page = 1, limit = 10, status, assignment } = req.query;
  const offset = (page - 1) * limit;

  const whereClause = {};

  // Filtro por estado
  if (status) {  // TODO. type par q slo pueda tener elñ estado de OPEN/CLOSED
    whereClause.status = status.toUpperCase(); // Asegura que el estado esté en mayúsculas (OPEN, CLOSED)
  }

  // Filtro por asignación
  if (assignment) { // TODO. type para los tipos de assignment 
    if (assignment === 'unassigned') {
      whereClause.assignedTo = null;
    } else if (assignment === 'assigned_to_me') {
      whereClause.assignedTo = req.userId;
    } else if (assignment === 'assigned_to_others') {
      whereClause.assignedTo = { [Op.not]: req.userId };
    }
  }

  try {
    const { count, rows } = await Incident.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'username'], // Incluir solo los campos necesarios
        },
      ],
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      incidents: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const createIncident = async (req, res) => {
  const { title, priority, assignedTo } = req.body;

  try {
    const newIncident = await Incident.create({
      title,
      priority,
      assignedTo,
    });

    res.status(201).json(newIncident);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};

export async function updateIncidentStatus (req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const incident = await Incident.findByPk(id);
  if (!incident) return res.status(404).json({ error: 'Incident not found' });

  incident.status = status;
  await incident.save();

  res.json(incident);
};

export async function assignIncident  (req, res) {
  const { id } = req.params;
  const { userId } = req.body;

  const incident = await Incident.findByPk(parseInt(id));
  if (!incident) return res.status(404).json({ error: 'Incident not found' });

  incident.assignedTo = userId;
  await incident.save();

  res.json(incident);
};
