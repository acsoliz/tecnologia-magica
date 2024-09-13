import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};


export const getUsers = async (req, res)=>{
  const newUser = await User.findAll({});
  res.send(newUser)
}

export const getUserById = async (req, res)=>{
  const userId =  req.params.id || req.userId
  const userData = await User.findByPk(parseInt(userId));
  res.send(userData)
}
