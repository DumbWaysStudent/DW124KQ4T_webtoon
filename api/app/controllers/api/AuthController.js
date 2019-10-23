const bcrypt = require(`bcryptjs`);
const jwt = require('jsonwebtoken');
const fs = require("fs");


const validator = require(`../../libraries/Validator.js`);
const models = require(`../../../models`);
const env = require('../../../env');


const User = models.user;


function AuthController(){}

AuthController.prototype = {
    authenticate: async (req, res)=>{
        var rules = {
            email: {
                label: "E-mail",
                rule :{
                    required : true,
                    email    : true
                }
            },
            password: {
                label: "Password",
                rule: {
                    required: true
                }
            }
        }

        let validate = await validator.make(req.body, rules);
        if(validate.fails()){
            return res.status(400).json({
                msg: "Something went wrong!",
                errors: validate.getMessages()
            });
        }
        else{
            let authUser = {}
            await User.findOne({where:{email: req.body.email}}).then(result => authUser = result);
            if(!authUser){

                return res.status(400).json({
                    msg: "Wrong E-mail or Password!" 
                });
            }
            else{
                bcrypt.compare(req.body.password, authUser.password).then((result) => { 
                    if(result){
                        let token = jwt.sign({ userId: authUser.id }, env.jwt.secret);
                        return res.status(200).json({
                            msg: "Welcome!",
                            data: {
                                id: authUser.id.toString(),
                                image: (authUser.image)?authUser.image:"https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
                                name: authUser.name,
                                email: authUser.email,
                                token: token
                            }
                        });
                    }
                    else{
                        return res.status(400).json({
                            msg: "Wrong E-mail or Password!" 
                        });
                    }
                });
            }
        }
    },
    register: async (req, res) => {
        var rules = {
            name: {
                label: "Name",
                rule: {
                    required: true
                }
            },
            email: {
                label: "E-mail",
                rule :{
                    required : true,
                    email    : true,
                    unique   : "user,email"
                }
            },
            password: {
                label: "Password",
                rule: {
                    required: true
                }
            }
        }

        let validate = await validator.make(req.body, rules);
        if(validate.fails()){
            return res.status(400).json({
                msg: "Something went wrong!",
                errors: validate.getMessages()
            });
        }
        else{
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }).then((result)=>{
                if(result){
                    let token = jwt.sign({ userId: result.dataValues.id }, env.jwt.secret);
                    return res.status(200).json({
                        msg: "Welcome!",
                        data: {
                            id: result.dataValues.id.toString(),
                            image: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
                            name: result.dataValues.name,
                            email: result.dataValues.email,
                            token: token
                        }
                    });
                }
                else{
                    return res.status(400).json({
                        msg: "Wrong E-mail or Password!" 
                    });
                }
            })
        }
    },
    changePhoto: async (req, res) => {
        var usr =null;
        await User.findOne({
            where: {
                id: req.user.userId
            }
        }).then(result=>usr=result);

        var currentImage = usr.image;

        User.update({
            image: `storage/${req.file.filename}`
        },{
            where: {
                id: req.user.userId
            }
        }).then(result=>{
            fs.unlink(`${__dirname}/../../../${currentImage}`, ()=>{
                return res.status(200).json({
                    msg:"success",
                    data: {
                        data: req.file.filename
                    }
                });
            })
        });
        
    }
}

module.exports = new AuthController;