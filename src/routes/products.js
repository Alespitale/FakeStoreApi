import { Router as r } from 'express'
import { ProductsController } from '../controllers/products.js'
import { ProductsRepository } from '../repositories/products.js'
import { ProductsService } from '../service/products.js'
import { products as productsModel } from '../models/products.js'
import { callbackHandler as handler } from '../helpers/callbackHandler.js'
import { isNumberId } from '../middlewares/isNumberId.js'

const router = r()
const productsRepository = new ProductsRepository(productsModel)
const productsService = new ProductsService(productsRepository)
const productsController = new ProductsController(productsService)

router
    .get('/', handler(productsController.getProducts()))
    .get('/categories', handler(productsController.getProductsInCategories()))
    .get('/prices', handler(productsController.getProductsByPrices()))
    .get('/expensive', handler(productsController.getMostExpensiveByCategory()))
    .get('/:id', handler(isNumberId), handler(productsController.getProductById()))

export default router
