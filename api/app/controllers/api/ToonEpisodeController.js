const models = require('../../../models');
const Episode = models.toon_episode;

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
    }
}