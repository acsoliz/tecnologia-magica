import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export async function createUser(req, res) {
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

export async function getUsers(req, res) {
  const newUser = await User.findAll({});
  res.send(newUser)
}

export async function getUserById(req, res) {
  const userId = req.params.id || req.userId
  const userData = await User.findByPk(parseInt(userId));
  res.send(userData)
}

export async function createAdminUserIfNotExists() {
  const adminExists = await User.findOne({ where: { role: 'admin' } });
  const password = await bcrypt.hash('CodeLandia', 10);

  if (!adminExists) {
    const adminUser = await User.create({
        username: 'centinela',
        role: 'admin',
        password: password
    })

    console.log(`Admin user created:
      Username: ${adminUser.username}
      Password: ${password}`)
  } else {
    console.log('An admin user already exist.')
  }
}

export async function createUserForTest() {
  const warriorExist = await User.findOne({ where: { role: 'warrior' } });
  const password = await bcrypt.hash('CodeLandia', 10);
  if (!warriorExist) {
    const warrior = await User.create({
        username: 'padawan',
        role: 'warrior',
        password
    })

    console.log(`Warrior created:
      Username: ${warrior.username}
      Password: ${password}`)
  } else {
    console.log('A warrior user already exist.')
  }
}

export async function removeUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id'], 
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to delete user. There may be associated incidents or another issue.',
    });
  }
}

