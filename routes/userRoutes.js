const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');


router.get('/users', userController.getUsers);

router.post('/users', userController.addUser);

router.delete('/users/:id', userController.deleteUser);

router.put('/users/:id', userController.updateUser);

module.exports = router;
