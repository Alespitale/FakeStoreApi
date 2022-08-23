import { HttpError } from '../helpers/http/httpError.js'
import { HttpResponse } from '../helpers/http/httpResponse.js'
import { JSON } from '../helpers/contentType.js'
import { httpStatusCode as status } from '../helpers/http/httpStatusCode.js'
import { limitData } from '../helpers/limitData.js'

export class UserController {
    constructor(usersService) {
        this.usersService = usersService
    }
    getUsers() {
        return async (httpRequest) => {
            const { limit, sort } = httpRequest.query
            try {
                let users = await this.usersService.getAll()
                if (sort === 'desc') users = users.reverse()
                users = limitData(users, limit)
                return new HttpResponse(status.OK, users, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getUser() {
        return async (httpRequest) => {
            const { id } = httpRequest.params
            try {
                const user = await this.usersService.getById(id)
                return new HttpResponse(status.OK, user, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
    getFirstsUsers() {
        return async () => {
            try {
                const users = await this.usersService.getFirsts()
                return new HttpResponse(status.OK, users, JSON, {})
            } catch (error) {
                throw new HttpError(error.message, status.INTERNAL_SERVER_ERROR)
            }
        }
    }
}