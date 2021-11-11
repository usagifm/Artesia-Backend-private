import { City, Artefact, Tourism } from '../../db/models'
import cloudinary from "../../helper/imageUpload"

const CityAdminController = {

    async getCities(req, res, next) {
        console.log('isinya :' + req.user.user.role)

        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }

        try {
        const cities = await City.findAll();

    
        if (!cities || cities == '') {
            res.status(400).send({
                "message": "Opps, Its Empty !"
            })
        }
        return res.status(200).send(cities)

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    },


    async getCity(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }

        const city = await City.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!city) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        try {

        const cityTourisms = await Tourism.findAll({
            where: {
                cityId: req.params.id
            }
        })

        const data = {
            city: city,
            cityTourisms: cityTourisms
        }

        return res.status(200).send(data)


        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }

    },




    async addCity(req, res, next) {
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

            const cityCollection = await City.create({
                name: req.body.name,
                photo: req.body.photo,
                location: req.body.location,
                createdBy: req.user.user.id
            })
            res.status(200).send(cityCollection)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },

    async updateCity(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await City.findByPk(req.params.id);

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

        await City.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const updatedCity = await City.findByPk(req.params.id);

        res.status(200).send(updatedCity)

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }



    },

    async deleteCity(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await City.findByPk(req.params.id);

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        try{

        await City.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            "message": "City Deleted"
        })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    }


};


export default CityAdminController;