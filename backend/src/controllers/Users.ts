import express from 'express';
import { UsersService } from '../services';

const UsersController = express.Router();

UsersController.get('', UsersService.getUsers);
UsersController.get('/:id', UsersService.getUser);
UsersController.post('/generateTeam', UsersService.generateTeam);
UsersController.post('', UsersService.addUser);
// UsersController.post('/mocks', UsersService.addMockUsers);
UsersController.patch('/:id', UsersService.updateUser);
UsersController.delete('/:id', UsersService.deleteUser);

export default UsersController;
