import { HttpError } from '../helpers/http/httpError.js'
import { httpStatusCode as status } from '../helpers/http/httpStatusCode.js'
import {HttpResponse} from '../helpers/http/httpResponse.js'

export const isNumberId = (httpRequest) => {
    const hasCharacters = /[a-zA-Z]+/g
    const { id } = httpRequest.params
    if (!hasCharacters.test(id)) {
        return { callNext: true }
    } else {
        const { message: error, statusCode } = new HttpError(
            'Id must be a positive number',
            status.BAD_REQUEST
        )
        return new HttpResponse(statusCode, { error, statusCode, ok: false })
    }
}