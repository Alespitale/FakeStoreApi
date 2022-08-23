import { Router as r } from 'express'
import { UsersRepository } from '../repositories/users.js'
import { users } from '../models/users.js'
import { UserController } from '../controllers/users.js'
import { UsersService } from '../service/users.js'
import { isNumberId } from '../middlewares/isNumberId.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'

const router = r()
const usersRepository = new UsersRepository(users)
const usersService = new UsersService(usersRepository)
const userController = new UserController(usersService)

router
    .get('/', handler(userController.getUsers()))
    .get('/firsts', handler(userController.getFirstsUsers()))
    .get('/:id', handler(isNumberId), handler(userController.getUser()))

export default router