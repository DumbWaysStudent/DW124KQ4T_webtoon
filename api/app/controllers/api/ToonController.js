const models = require('../../../models');
const User = models.user;
const Toon = models.toon;
const Episode = models.toon_episode;
const Favorite = models.favorite;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require(`../../libraries/Validator.js`);

module.exports = {
    index: async (req, res)=>{
        var toons = []
        await Toon.findAll().then(result=>toons=result)

        var toons2= JSON.parse(JSON.stringify(toons));

        for(var i=0;i<toons2.length; i++){
            var toon = null
            await Favorite.findOne({where:{userId:req.user.userId, toonId: toons2[i].id}}).then(result=>toon=result);
            
            if(toon){
                toons2[i].favorited = true;
            }
            else{
                toons2[i].favorited = false;
            }

        }

        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons2
            }
        });
    },

    banner: async (req, res)=>{
        var toons = []
        await Toon.findAll().then(result=>toons=result)
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    },

    favorite: async (req, res)=>{
        var toons = []
        await Favorite.findAll({
            where: {userId:req.user.userId},
            include:[{
                as: 'toon',
                model: Toon,
                include: ['user']
            }]
        }).then(result=>toons=result)
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    },

    search: async (req, res) => {
        var toons = []
        await Toon.findAll({
            where: {
                title: { [Op.like]: `%${req.params.keyword}%` }
            },
            include: ['user']
        }).then(result=>toons=result);
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    },
    
    show: async (req, res) => {
        var toons = []
        await Toon.findOne({
            where: {
                id: req.params.id
            }
        }).then(result=>toons=result);
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    },

    episodes: async (req, res) => {
        var episodes = null
        await Episode.findAll({
            where: {
                toonId: req.params.id
            }
        }).then(result=>episodes=result);
        return res.status(200).json({
            msg: "Success",
            data: {
                data: episodes
            }
        });
    },

    myToon: async (req, res) => {
        var toons = null
        await Toon.findAll({
            where: {
                userId: req.user.userId
            },
            order: [
                ['createdAt', 'DESC'],
            ]
        }).then(result=> toons = result);

        var toons2 = JSON.parse(JSON.stringify(toons));

        for(var i=0; i<toons2.length; i++){
            var total = 0;
            await Episode.count({
                where: {
                    toonId: toons2[i].id
                },
                distinct: true,
                col: 'id'
            }).then(result=>total = result);
            toons2[i].totalEpisode = total;
        }
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons2
            }
        });
    },

    store: async (req, res) => {
        var rules = {
            title: {
                label: "Title",
                rule: {
                    required: true
                }
            }
        }

        let validate = await validator.make(req.body, rules);
        if(validate.fails()){
            return res.status(400).json({
                errors: validate.getMessages()
            });
        }
        else{
            var toon = null
            await Toon.create({
                image: req.body.image,
                title: req.body.title,
                userId: req.user.userId
            }).then(result=>toon=result.dataValues);

            var toon2 = JSON.parse(JSON.stringify(toon));
            toon2.totalEpisode = 0;

            return res.status(200).json({
                msg: "Success",
                data: {
                    data: toon2
                }
            });
        }
    },
    update: async (req, res) => {
        var rules = {
            title: {
                label: "Title",
                rule: {
                    required: true
                }
            }
        }

        let validate = await validator.make(req.body, rules);
        if(validate.fails()){
            return res.status(400).json({
                errors: validate.getMessages()
            });
        }
        else{
            var currentToon = null
            await Toon.findOne({
                where: {
                    id: req.params.id,
                    userId: req.user.userId
                }
            }).then(result=>currentToon=result);

            if(currentToon){
                Toon.update({
                    title: req.body.title,
                    image: (req.body.image=="")?currentToon.image:req.body.image
                },{
                    where: {
                        id: currentToon.id
                    }
                }).then(async result => {
                    var nowToon = null;

                    await Toon.findOne({
                        where: {
                            id: req.params.id,
                        }
                    }).then(result=>nowToon=result);

                    var total = 0;
                    Episode.count({
                        where: {
                            toonId: nowToon.id
                        },
                        distinct: true,
                        col: 'id'
                    }).then(result=>{
                        total = result
                        nowToon = JSON.parse(JSON.stringify(nowToon));
                        return res.status(200).json({
                            msg: "Success",
                            data: {
                                data: {...nowToon, totalEpisode: total}
                            }
                        });
                    });
                    
                });
            }
            else{
                return res.status(200).json({
                    msg: "Success",
                    data: {
                        data: []
                    }
                });
            }
        }
    },
    delete: (req, res) => {
        Toon.destroy({
            where: {
                id: req.params.id,
                userId: req.user.userId
            }
        }).then(result=>{
            return res.status(200).json({
                msg: "success"
            });
        });
    }
};