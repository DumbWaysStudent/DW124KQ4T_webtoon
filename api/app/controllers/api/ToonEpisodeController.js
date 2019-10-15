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
        })
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
            console.log({
                errors: validate.getMessages()
            });
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
    }
}