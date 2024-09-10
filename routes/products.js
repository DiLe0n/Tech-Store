let productsController = require("../controllers/productsController")
let usersMiddleware = require("../middleware/users")
let router = require("express").Router()

router.get("/", usersMiddleware.isLoggedIn, (req, res, next) => {
    productsController.listProducts(req, res)
})

router.get("/:name", usersMiddleware.isLoggedIn, (req, res, next) => {
    productsController.searchProducts(req, res)
})

router.post("/", usersMiddleware.isAdmin, (req, res, next) => {
    productsController.addProduct(req, res)
})

router.put("/", usersMiddleware.isAdmin, (req, res, next) => {
    productsController.updateProduct(req, res)
})

module.exports = router

