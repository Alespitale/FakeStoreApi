import { ContentType } from '../contentType.js'
import { httpStatusCode as status } from './httpStatusCode.js'
import { HttpError } from './httpError.js'

const schema = {
    statusCode: (value) => Object.values(status).indexOf(parseInt(value)) !== -1,
    contentType: (value) => Object.values(ContentType).indexOf(value) !== -1,
    callNext: (value) => typeof value === 'boolean'
}

const validateHttpResponse = (httpResponse) => {
    const errors = []
    for (const key in schema) {
        if (!schema[key](httpResponse[key])) {
            errors.push(`${key} is invalid "${httpResponse[key]}"`)
        }
    }
    if (errors.length > 0)
        throw new HttpError(errors.join(', '), status.INTERNAL_SERVER_ERROR)
}

export class HttpResponse {
    constructor(statusCode, body, contentType, headers, callNext = false) {
        this.statusCode = statusCode
        this.body = body
        this.contentType = contentType
        this.headers = headers
        this.callNext = callNext
        validateHttpResponse(this)
    }
}