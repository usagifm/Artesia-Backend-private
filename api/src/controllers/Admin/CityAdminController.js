import { City, Artefact } from '../../db/models'

const CityAdminController = {

    async getCities(req, res, next) {
        console.log('isinya :' + req.user.user.role)

        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        const cities = await City.findAll();

        if (!cities || cities == '') {
            res.status(400).send({
                "message": "Opps, Its Empty !"
            })
        }



        return res.status(200).send(cities)
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

        const cityArtefacts = await Artefact.findAll({
            where: {
                cityId: req.params.id
            }
        })

        const data = {
            city: city,
            cityArtefacts: cityArtefacts
        }

        return res.status(200).send(data)

    },




    async addCity(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
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

        await City.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const updatedCity = {
            id: req.params.id,
            name: req.body.name,
            photo: req.body.photo,
            location: req.body.location,
        }

        res.status(200).send(updatedCity)



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

        await City.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            "message": "City Deleted"
        })

    }


};


export default CityAdminController;