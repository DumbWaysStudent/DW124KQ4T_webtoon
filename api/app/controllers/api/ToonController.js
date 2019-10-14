const models = require('../../../models');
const User = models.user;
const Toon = models.toon;
const Episode = models.toon_episode;
const Favorite = models.favorite;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    index: async (req, res)=>{
        var toons = []
        await Toon.findAll().then(result=>toons=result)

        var toons2= JSON.parse(JSON.stringify(toons));

        for(var i=0;i<toons2.length; i++){
            var toon = null
            await Favorite.findOne({where:{user_id:req.user.userId, toon_id: toons2[i].id}}).then(result=>toon=result);
            
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
        await Favorite.findAll({where:{user_id:req.user.userId}, include:['toon']}).then(result=>toons=result)
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
            }
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
                toon_id: req.params.id
            }
        }).then(result=>episodes=result);
        return res.status(200).json({
            msg: "Success",
            data: {
                data: episodes
            }
        });
    }
};