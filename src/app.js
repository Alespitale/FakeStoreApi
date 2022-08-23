import Express from 'express'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'
import cartsRouter from './routes/carts.js'
import { logger } from './middlewares/logger.js'
import { invalidRoute } from './middlewares/error404.js'
import { callbackHandler as handler } from './helpers/callbackHandler.js'

const app = Express()
const port = process.env.port || 3000

app.use(handler(logger))
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/carts', cartsRouter)
app.use(handler(invalidRoute))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})