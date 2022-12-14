export class HttpRequest {
    constructor(req) {
        this.body = req.body
        this.query = req.query
        this.params = req.params
        this.headers = {
            accept: req.headers['accept'],
            authorization: req.headers['authorization']
        }
        this.method = req.method
        this.path = req.path
        this.url = req.url
    }
}
