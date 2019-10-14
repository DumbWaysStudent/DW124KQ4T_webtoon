const models = require('../../../models')
const User = models.user
const Toon = models.toon

module.exports = {
    index: async (req, res)=>{
        var toons = []
        await Toon.findAll().then(rslt=>toons=rslt)
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    },

    banner: async (req, res)=>{
        var toons = []
        await Toon.findAll().then(rslt=>toons=rslt)
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    },

    favorite: async (req, res)=>{
        var toons = []
        await Toon.findAll().then(rslt=>toons=rslt)
        return res.status(200).json({
            msg: "Success",
            data: {
                data: toons
            }
        });
    }
};