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
const userRouter = require('./routes/user')
const receiptRouter = require('./routes/receipt')
const promotionRouter = require('./routes/promotion')
const profileRouter = require('./routes/profile')
const cartRouter = require('./routes/cart')
const commentRouter = require('./routes/comment')
const imageRouter = require('./routes/image')


app.use(indexRouter.router)
app.use(orderRouter.router)
app.use(searchRouter.router)
app.use(productRouter.router)
app.use(cafeRouter.router)
app.use(userRouter.router)
app.use(receiptRouter.router)
app.use(promotionRouter.router)
app.use(profileRouter.router)
app.use(cartRouter.router)
app.use(commentRouter.router)
app.use(imageRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})