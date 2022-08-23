import { Router as r } from 'express'
import { CartsController } from '../controllers/carts.js'
import { CartsRepository } from '../repositories/carts.js'
import { UsersRepository } from '../repositories/users.js'
import { users } from '../models/users.js'
import { CartsService } from '../service/carts.js'
import { carts as cartsModel } from '../models/carts.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
import { isNumberId } from '../middlewares/isNumberId.js'

const router = r()

const usersRepository = new UsersRepository(users)
const cartsRepository = new CartsRepository(cartsModel)
const cartsService = new CartsService(cartsRepository, usersRepository)
const cartsController = new CartsController(cartsService)

router
    .get('/', handler(cartsController.getCarts()))
    .get('/bigcarts', handler(cartsController.getBiggerCarts()))
    .get('/:id', handler(isNumberId), handler(cartsController.getSingleCarts()))

export default router
