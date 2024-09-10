let router = require("express").Router()

const register = require("./register.js")
const login = require("./login.js")
const products = require("./products.js")
const clients = require("./clientRoute.js")
const orders = require("./orders.js")

router.use("/register", register)
router.use("/login", login)
router.use("/products", products)
router.use("/client", clients)
router.use("/orders", orders)

module.exports = router