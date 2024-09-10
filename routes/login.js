let usersController = require("../controllers/usersController")
let router = require("express").Router()

router.post("/", (req, res) => {
    usersController.login(req, res)
})

module.exports = router