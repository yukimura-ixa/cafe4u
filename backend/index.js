const express = require("express")

const app = express();
const cors = require('cors')
app.use(cors())

const { logger } = require('./middlewares')
app.use(logger)

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const orderRouter = require('./routes/order')
const searchRouter = require('./routes/search')
const productRouter = require('./routes/product');
const cafeRouter = require('./routes/cafe')


app.use(indexRouter.router)
app.use(orderRouter.router)
app.use(searchRouter.router)
app.use(productRouter.router)
app.use(cafeRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})