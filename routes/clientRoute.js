let clientController = require("../controllers/clientController")
let userMiddleware = require("../middleware/users")
let router = require("express").Router()

router.get("/", userMiddleware.isAdmin, (req, res, next) => {
    clientController.listar(req, res)
})

module.exports = router