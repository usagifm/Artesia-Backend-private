import { City, Artefact } from '../../db/models'

const ArtefactAdminController = {

    async getArtefact(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }

        const artefact = await Artefact.findOne({
            include:{
                model: City
            },
            where: {
                id: req.params.id,
                CityId: req.params.CityId
            }
        });

        if (!artefact) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        return res.status(200).send(artefact)

    },




    async addArtefact(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        try {
            const artefactCollection = await Artefact.create({
                slug: req.body.slug,
                title: req.body.title,
                photo: req.body.photo,
                sub_title: req.body.sub_title,
                trivia: req.body.trivia,
                location: req.body.location,
                CityId: req.params.CityId,
                effect_url: req.body.effect_url,
                createdBy: req.user.user.id
            })
            res.status(200).send(artefactCollection)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },

    async updateArtefact(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await Artefact.findOne({where: {
            id: req.params.id,
            CityId: req.params.CityId
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await Artefact.update(req.body, {
            where: {
                id: req.params.id,
                CityId: req.params.CityId
            }
        });

        const updatedArtefact = {
            slug: req.body.slug,
            title: req.body.title,
            photo: req.body.photo,
            sub_title: req.body.sub_title,
            trivia: req.body.trivia,
            location: req.body.location,
            CityId: req.params.CityId,
            effect_url: req.body.effect_url,
            createdBy: req.user.user.id
        }

        res.status(200).send(updatedArtefact)
    },

    async deleteArtefact(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
       
        const idCheck = await Artefact.findOne({where: {
            id: req.params.id,
            CityId: req.params.CityId
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await Artefact.destroy({
            where: {
                id: req.params.id,
                CityId: req.params.CityId
            }
        });
        res.status(200).send({
            "message": "Artefact Deleted"
        })

    }


};


export default ArtefactAdminController;