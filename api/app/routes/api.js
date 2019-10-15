const bodyParser = require('body-parser');
const multer = require("multer");
const path             = require('path');
const mid = require('./middleware')

const ToonController = require("../controllers/api/ToonController");
const AuthController = require("../controllers/api/AuthController");
const ToonEpisodeController = require("../controllers/api/ToonEpisodeController");



const uploadPhotoProfile = multer({
    storage: multer.diskStorage({
        destination: `${__dirname}/../../storage/`,
        filename: function(req, file, cb){
            var filename = (new Date).getTime();
            filename = (filename==null) ? (file.originalname) : (filename + path.extname(file.originalname))
            console.log(file.originalname);
          cb(null,filename);
        }
    })
}).single('avatar');


module.exports = (router) => {
    router.group("/auth", (auth) =>{
        auth.post("/authenticate", [bodyParser.json()], AuthController.authenticate);
        auth.post("/register", [bodyParser.json()], AuthController.register);
        auth.post("/change-photo", [mid.auth, uploadPhotoProfile], AuthController.changePhoto);
    });
    router.group("/toons", (toons) =>{
        toons.get("/all", [mid.auth], ToonController.index);
        toons.get("/banner", [mid.auth], ToonController.banner);
        toons.get("/favorite", [mid.auth], ToonController.favorite);
        toons.get("/search/:keyword", [mid.auth], ToonController.search);
    });
    router.group("/toon", (toon) =>{
        toon.post("/create", [mid.auth, bodyParser.json()], ToonController.store);
        toon.get("/:id", ToonController.show);
        toon.get("/:id/episodes", ToonController.episodes);
        toon.put("/:id/edit", [mid.auth, bodyParser.json()], ToonController.update);
    });
    router.get("/toon-episode/:id", [mid.auth], ToonEpisodeController.show);
    router.get("/my-toons", [mid.auth], ToonController.myToon);
    
    
}