const bodyParser = require('body-parser');
const mid = require('./middleware')

const ToonController = require("../controllers/api/ToonController");
const AuthController = require("../controllers/api/AuthController");


module.exports = (router) => {
    router.group("/auth", (auth) =>{
        auth.post("/authenticate", [bodyParser.json()], AuthController.authenticate);
    });
    router.group("/toons/", (toon) =>{
        toon.get("/all", ToonController.index);
        toon.get("/banner", ToonController.index);
        toon.get("/favorite", [mid.auth], ToonController.index);
    });
    
}