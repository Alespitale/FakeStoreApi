import { JSON } from '../helpers/contentType.js'
import { HttpError } from '../helpers/http/httpError.js'
import { HttpResponse } from '../helpers/http/httpResponse.js'
import { httpStatusCode as status } from '../helpers/http/httpStatusCode.js'

export const invalidRoute = () => {
    const { message, statusCode } = new HttpError('Invalid route', NOT_FOUND)
    return new HttpResponse(status.NOT_FOUND, { message, statusCode, ok: false }, JSON, {})
}