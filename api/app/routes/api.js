const bodyParser = require('body-parser');
const ToonController = require("../controllers/api/ToonController");
const AuthController = require("../controllers/api/AuthController");


module.exports = (router) => {
    router.group("/auth", (auth) =>{
        auth.post("/authenticate", [bodyParser.json()], AuthController.authenticate);
    });
    router.get("/toons", [bodyParser.json()], ToonController.index);
}