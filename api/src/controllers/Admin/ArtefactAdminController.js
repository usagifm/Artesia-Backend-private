import { City, Artefact,Tourism } from '../../db/models'
import cloudinary from "../../helper/imageUpload"

const ArtefactAdminController = {

    async getArtefact(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }

        const artefact = await Artefact.findOne({
            include:[
                {model: City},
                {model: Tourism}
            ],
            where: {
                id: req.params.id,
                CityId: req.params.CityId,
                TourismId: req.params.TourismId
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
            

        
        if(req.body.title){

            function convertToSlug(Text)
            {
                return Text
                    .toLowerCase()
                    .replace(/[^\w ]+/g,'')
                    .replace(/ +/g,'-')
                    ;
            }

             req.body.slug = convertToSlug(req.body.title) 
            
        }

            const artefactCollection = await Artefact.create({
                slug: req.body.slug,
                title: req.body.title,
                photo: req.body.photo,
                sub_title: req.body.sub_title,
                trivia: req.body.trivia,
                location: req.body.location,
                CityId: req.params.CityId,
                TourismId: req.params.TourismId,
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
            CityId: req.params.CityId,
            TourismId: req.params.TourismId
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

            if(req.body.title){

                function convertToSlug(Text)
                {
                    return Text
                        .toLowerCase()
                        .replace(/[^\w ]+/g,'')
                        .replace(/ +/g,'-')
                        ;
                }
    
                 req.body.slug = convertToSlug(req.body.title) 
                
            }


        await Artefact.update(req.body, {
            where: {
                id: req.params.id,
                CityId: req.params.CityId,
                TourismId: req.params.TourismId
            }
        });
        

        const updatedArtefact = await Artefact.findOne({where: {
            id: req.params.id,
            CityId: req.params.CityId,
            TourismId: req.params.TourismId
        }});

        res.status(200).send(updatedArtefact)

    } catch (err) {
        res.status(400).send(err)
    }

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
                CityId: req.params.CityId,
                TourismId: req.params.TourismId
            }
        });
        res.status(200).send({
            "message": "Artefact Deleted"
        })

    }


};


export default ArtefactAdminController;