const bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');


const mid = require('./middleware');


const ToonController = require("../controllers/api/ToonController");
const AuthController = require("../controllers/api/AuthController");
const ToonEpisodeController = require("../controllers/api/ToonEpisodeController");


const upload = multer({
    storage: multer.diskStorage({
        destination: `${__dirname}/../../storage/`,
        filename: function(req, file, cb){
            var filename = (new Date).getTime();
            filename = (filename==null) ? (file.originalname) : (filename + path.extname(file.originalname))
            console.log(file.originalname);
          cb(null,filename);
        }
    })
});


module.exports = (router) => {

    router.group("/auth", (auth) =>{
        auth.post("/authenticate", [bodyParser.json()], AuthController.authenticate);
        auth.post("/register", [bodyParser.json()], AuthController.register);
        auth.post("/change-photo", [mid.checkAuth, mid.auth, upload.single('avatar')], AuthController.changePhoto);
    });

    router.group("/toons", (toons) =>{

        toons.get("/", [mid.checkAuth, mid.auth], ToonController.index); 
        toons.get("/banner", [mid.checkAuth, mid.auth], ToonController.banner); 
        toons.get("/favorite", [mid.checkAuth, mid.auth], ToonController.favorite); 
        toons.get("/search/:keyword", ToonController.search); 

    });

    router.group("/toon", (toon) =>{

        toon.post("/create", [mid.checkAuth, mid.auth, bodyParser.json()], ToonController.store); // /
        toon.get("/:id", ToonController.show);
        toon.get("/:id/episodes", ToonController.episodes);
        toon.put("/:id/edit", [mid.checkAuth, mid.auth, bodyParser.json()], ToonController.update); // /:id
        toon.delete("/:id", [mid.checkAuth, mid.auth], ToonController.delete);

        toon.group("/:toonId/episode", (toonEpisode) =>{
            toonEpisode.get("/:id", ToonEpisodeController.show);
            toonEpisode.post("/create", [mid.checkAuth, mid.auth, upload.array("images[]")], ToonEpisodeController.store);
            toonEpisode.put("/:id/edit", [mid.checkAuth, mid.auth, bodyParser.json()], ToonEpisodeController.update);
            toonEpisode.delete("/:id", [mid.checkAuth, mid.auth], ToonEpisodeController.delete);
            toonEpisode.post("/:id/upload-image", [mid.checkAuth, mid.auth,upload.single("image")], ToonEpisodeController.uploadImage);
            toonEpisode.delete("/delete-image/:id", [mid.checkAuth, mid.auth], ToonEpisodeController.deleteImage);
        });
    });

    router.get("/my-toons", [mid.checkAuth, mid.auth], ToonController.myToon);
    
}