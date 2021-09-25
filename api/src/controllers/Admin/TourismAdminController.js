import { City, Artefact, Tourism } from '../../db/models'
import cloudinary from "../../helper/imageUpload"

const TourismAdminController = {

    async getTourism(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }

        const tourism = await Tourism.findOne({
            where: {
                id: req.params.id,
                cityId: req.params.CityId
            }
        });

        if (!tourism) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        const tourismArtefacts = await Artefact.findAll({
            where: {
                TourismId: req.params.id,
                cityId: req.params.CityId
            }
        })

        const data = {
            tourism: tourism,
            tourismArtefacts: tourismArtefacts
        }

        return res.status(200).send(data)

    },




    async addTourism(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
     

            if(req.body.photo != null && req.body.photo != ""){
                try {
                const result = await cloudinary.uploader.upload(req.body.photo, {
                    public_id: `${req.body.name}_thumbnail`,
                    quality: 60
                })
    
                req.body.photo = result.secure_url
                    } catch (err) {
                        res.status(400).send(err)
                    }
    
            }

            try {

            const tourismCollection = await Tourism.create({
                name: req.body.name,
                photo: req.body.photo,
                location: req.body.location,
                CityId: req.params.CityId,
                createdBy: req.user.user.id
            })
            res.status(200).send(tourismCollection)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },

    async updateTourism(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await Tourism.findOne({where: {
            id: req.params.id,
            CityId: req.params.CityId
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }



        if(req.body.photo != null && req.body.photo != ""){
            try {
            const result = await cloudinary.uploader.upload(req.body.photo, {
                public_id: `${req.body.name}_thumbnail`,
                quality: 60
            })

            req.body.photo = result.secure_url
                } catch (err) {
                    res.status(400).send(err)
                }

        }


        try {

        await Tourism.update(req.body, {
            where: {
                id: req.params.id,
                CityId: req.params.CityId
            }
        });

        const updatedTourism = await Tourism.findOne({where: {
            id: req.params.id,
            CityId: req.params.CityId
        }});

        res.status(200).send(updatedTourism)

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
        
    },

    async deleteTourism(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
       
        const idCheck = await Tourism.findOne({where: {
            id: req.params.id,
            CityId: req.params.CityId
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await Tourism.destroy({
            where: {
                id: req.params.id,
                CityId: req.params.CityId
            }
        });
        res.status(200).send({
            "message": "Tourism Deleted"
        })

    }


};


export default TourismAdminController;