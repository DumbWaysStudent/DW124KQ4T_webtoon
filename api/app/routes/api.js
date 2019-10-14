const bodyParser = require('body-parser');
const mid = require('./middleware')

const ToonController = require("../controllers/api/ToonController");
const AuthController = require("../controllers/api/AuthController");


module.exports = (router) => {
    router.group("/auth", (auth) =>{
        auth.post("/authenticate", [bodyParser.json()], AuthController.authenticate);
    });
    router.group("/toons/", (toons) =>{
        toons.get("/all", [mid.auth], ToonController.index);
        toons.get("/banner", [mid.auth], ToonController.banner);
        toons.get("/favorite", [mid.auth], ToonController.favorite);
        toons.get("/search/:keyword", [mid.auth], ToonController.search);
    });
    router.group("/toon/", (toon) =>{
        toon.get("/:id", [mid.auth], ToonController.show);
        toon.get("/:id/episodes", [mid.auth], ToonController.episodes);
    });
    
    
}