let ordersController = require("../controllers/orderController")
let usersMiddleware = require("../middleware/users")
let router = require("express").Router()

router.get("/", usersMiddleware.isLoggedIn, (req, res) => {
    ordersController.listOrders(req, res)
})

router.get("/items/:id", usersMiddleware.isLoggedIn, (req, res) => {
    ordersController.listItems(req, res)
})

router.post("/", usersMiddleware.isLoggedIn, (req, res, next) => {
    ordersController.createOrder(req, res)
})

module.exports = router