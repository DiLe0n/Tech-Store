let loginController = require("../controllers/loginController.js")
let clientsMiddleware = require('../middleware/clients.js')

let router = require("express").Router()

router.post('/', clientsMiddleware.validateSignUp, (req, res, next) => {
    console.log(req.body)
    loginController.signUp(req, res)
}) 


module.exports = router