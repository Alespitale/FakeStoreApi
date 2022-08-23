import { JSON } from '../helpers/contentType.js'
import { HttpError } from '../helpers/http/httpError.js'
import { HttpResponse } from '../helpers/http/httpResponse.js'
import { httpStatusCode as status } from '../helpers/http/httpStatusCode.js'
import { limitData } from '../helpers/limitData.js'

export class ProductsController {
    constructor(productsService) {
        this.productsService = productsService
    }

    getProducts() {
        return async (httpRequest) => {
            const { limit, sort } = httpRequest.query
            try {
                let products = await this.productsService.getAll()
                if (sort === 'desc') products = products.reverse()
                products = limitData(products, limit)
                return new HttpResponse(status.OK, products, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getProductById() {
        return async (httpRequest) => {
            const { id } = httpRequest.params
            try {
                const product = await this.productsService.getById(id)
                return new HttpResponse(status.OK, product, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }

    getProductsInCategories() {
        return async () => {
            try {
                const products = await this.productsService.getInCategories()
                return new HttpResponse(status.OK, products, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getProductsByPrices() {
        return async (httpRequest) => {
            const { order } = httpRequest.query
            try {
                let products = await this.productsService.getProductsByPrices()      
                if (order === 'desc') products = products.reverse()

                return new HttpResponse(status.OK, products, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getMostExpensiveByCategory() {
        return async (httpRequest) => {
            try {
                const products = await this.productsService.getMostExpensiveByCategory()
                return new HttpResponse(status.OK, products, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
}