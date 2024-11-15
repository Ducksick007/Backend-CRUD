const db = require('../config/db');


const getUsers = (req, res) => {
  db.query('SELECT * FROM users ORDER BY age DESC', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(result);
  });
};


const addUser = (req, res) => {
  const { prefix, firstName, lastName, age, gender, phone, email } = req.body;


  if (!prefix || !firstName || !lastName || !age || !gender || !phone || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }


  const query = `INSERT INTO users (prefix, firstName, lastName, age, gender, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [prefix, firstName, lastName, age, gender, phone, email], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'User added!', user: req.body });
  });
};


const deleteUser = (req, res) => {
  const { id } = req.params;

 
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted!' });
  });
};


const updateUser = (req, res) => {
  const { id } = req.params;
  const { prefix, firstName, lastName, age, gender, phone, email } = req.body;


  if (!id || !prefix || !firstName || !lastName || !age || !gender || !phone || !email) {
    return res.status(400).json({ message: 'Missing required fields or ID' });
  }

  const query = `UPDATE users SET prefix = ?, firstName = ?, lastName = ?, age = ?, gender = ?, phone = ?, email = ? WHERE id = ?`;
  db.query(query, [prefix, firstName, lastName, age, gender, phone, email, id], (err, result) => {
    if (err) {
      console.error('Error during query execution:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated!', user: req.body });
  });
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser
};
