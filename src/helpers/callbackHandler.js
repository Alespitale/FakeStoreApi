import { HttpRequest } from './http/httpRequest.js'

export const callbackHandler =
    (controller) =>
        async (req, res, next) => {
            const httpRequest = Object.freeze(new HttpRequest(req))
            try {
                const httpResponse = await controller(httpRequest)
                if (httpResponse.callNext) next()
                else {
                    res.set(httpResponse.headers)
                    res.type(httpResponse.contentType)
                    res.status(httpResponse.statusCode).send(httpResponse.body)
                }
            } catch (e) {
                const { statusCode, message: error } = e
                res.status(statusCode).send({ error, statusCode, ok: false })
            }
        }