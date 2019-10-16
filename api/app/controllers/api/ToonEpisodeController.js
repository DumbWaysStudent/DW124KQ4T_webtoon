const models = require('../../../models');
const Episode = models.toon_episode;
const EpisodeIMG = models.toon_episode_image;
const validator = require(`../../libraries/Validator.js`);
const fs = require("fs");

module.exports = {
    show: async (req, res) => {
        var episode = null;
        await Episode.findOne({
            where: {
                id: req.params.id
            },
            include: ["images"]
        }).then(result=> episode = result);

        return res.status(200).json({
            msg: "Success",
            data: {
                data: episode
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
            },
            toonId: {
                label: "ToonId",
                rule: {
                    required: true
                }
            }
        }

        let validate = await validator.make(req.body, rules);
        if(validate.fails()){
            for(var i=0; i<req.files.length; i++){
                fs.unlinkSync(`${__dirname}/../../../storage/${req.files[i].filename}`);
            }
            return res.status(400).json({
                errors: validate.getMessages()
            });
        }
        else{
            var curEps=null;
            await Episode.create({
                title: req.body.title,
                toonId: req.body.toonId,
                image: `storage/${req.files[0].filename}`
            }).then(result=> curEps= result.dataValues);
            for(var i=0; i<req.files.length; i++){
                await EpisodeIMG.create({
                    url: `storage/${req.files[i].filename}`,
                    toonEpisodeId: curEps.id
                });
            }

            var nowEps = null;
            await Episode.findOne({
                where: {
                    id: curEps.id
                }
            }).then(result=> nowEps = result);

            return res.status(200).json({
                msg:"success",
                data: {
                    data: nowEps
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
            await Episode.update({
                title: req.body.title
            },{
                where: {
                    id: req.params.id
                }
            });
            return res.status(200).json({
                msg: "Success"
            });
        }
    },
    delete: async (req, res) => {
        var episode = null;
        await Episode.findOne({
            where: {id:req.params.id},
            include: ['toon']
        }).then(result=>episode=result);
        
        if(episode.toon.userId === req.user.userId){
            await Episode.destroy({
                where: {
                    id: req.params.id
                }
            });
        }

        return res.status(200).json({
            msg: "Success"
        });
    },
    uploadImage: async (req, res)=>{
        await EpisodeIMG.create({
            url: `storage/${req.file.filename}`,
            toonEpisodeId: req.params.id
        }).then(result=>{
            return res.status(200).json({
                msg: "Success",
                data: {
                    data: result.dataValues
                }
            });
        });
    },
    deleteImage: async (req, res) => {
        EpisodeIMG.findOne({
            where: {id:req.params.id},
            include:[{
                as: 'episode',
                model: Episode,
                include: ['toon']
            }]
        }).then(async result=>{
            if(result.episode.toon.userId == req.user.userId){
                await EpisodeIMG.destroy({
                    where: {id:req.params.id}
                });
            }
            return res.status(200).json({
                msg: "success"
            });
        });
    }
}