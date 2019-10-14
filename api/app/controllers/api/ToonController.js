const models = require('../../../models')
const User = models.user
const Toon = models.toon

module.exports = {
    index: (req, res)=>{
        User.findAll({include: ['toons']}).then(rslt=>res.send(rslt))
        // return res.status(200).json({
        //     nice: "nice"
        // });
    }
};