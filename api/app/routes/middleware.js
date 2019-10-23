const jwt = require('express-jwt');


const env = require('../../env');

function middleware () {}

middleware.prototype= {
    checkAuth: (req, res, next)=>{
        if(req.headers.authorization){
            next(); 
        }
        else{
            return res.status(401).json({
                msg: "Unauthorized!"
            });
        }
    },
    auth: jwt({secret: env.jwt.secret})
}

module.exports = new middleware;