const bodyParser = require('body-parser');
const mid = require('./middleware')

const ToonController = require("../controllers/api/ToonController");
const AuthController = require("../controllers/api/AuthController");
const ToonEpisodeController = require("../controllers/api/ToonEpisodeController");


module.exports = (router) => {
    router.group("/auth", (auth) =>{
        auth.post("/authenticate", [bodyParser.json()], AuthController.authenticate);
        auth.post("/register", [bodyParser.json()], AuthController.register);
    });
    router.group("/toons", (toons) =>{
        toons.get("/all", [mid.auth], ToonController.index);
        toons.get("/banner", [mid.auth], ToonController.banner);
        toons.get("/favorite", [mid.auth], ToonController.favorite);
        toons.get("/search/:keyword", [mid.auth], ToonController.search);
    });
    router.group("/toon", (toon) =>{
        toon.get("/:id", [mid.auth], ToonController.show);
        toon.get("/:id/episodes", [mid.auth], ToonController.episodes);
    });
    router.get("/toon-episode/:id", [mid.auth], ToonEpisodeController.show);
    
    
}