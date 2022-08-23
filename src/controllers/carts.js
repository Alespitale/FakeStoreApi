import { JSON } from '../helpers/contentType.js'
import { HttpError }   from '../helpers/http/httpError.js'
import { HttpResponse } from '../helpers/http/httpResponse.js'
import { httpStatusCode as status } from '../helpers/http/httpStatusCode.js'
import { limitData } from '../helpers/limitData.js'

export class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService
    }
    getCarts() {
        return async (httpRequest) => {
            const { limit, sort } = httpRequest.query
            try {
                let carts = await this.cartsService.getAll()
                if (sort === 'desc') carts = carts.reverse()
                carts = limitData(carts, limit)
                return new HttpResponse(status.OK, carts, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getBiggerCarts() {
        return async () => {
            try {
                const biggerCarts = await this.cartsService.getBiggerCarts()
                return new HttpResponse(status.OK, biggerCarts, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getSingleCarts() {
        return async (httpRequest) => {
            const { id } = httpRequest.params
            try {
                const cart = await this.cartsService.getById(id)
                return new HttpResponse(status.OK, cart, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
}