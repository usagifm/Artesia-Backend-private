import { User, Artefact, City, UserArtefact,CityArtefactCount } from "../db/models";



const UserController = {
    async getUserDetail(req, res, next){
        
        const user = await User.findOne({include: [
            {model: City, include: [{model: Artefact},
            {model:CityArtefactCount}]}
         
        ],
        where: {id : req.user.user.id}});
        return res.status(200).send(user)
    },

    async getArtefactDetail(req, res, next){

        const artefact = await Artefact.findOne({  
            include: [
                {
                model: City
                }
            ]
            ,where: {
            slug: req.params.slug}});

            if (!artefact) {
                res.status(400).send({
                    "message": "Record not found"
                })
            }

            const checkUserArtefact = await UserArtefact.findOne({where: {
                ArtefactId: artefact.id,
                CityId: artefact.CityId,
                UserId: req.user.user.id
            }});

            if (checkUserArtefact) {
                // do nothing
            } else if (!checkUserArtefact){
                await UserArtefact.create({
                    ArtefactId: artefact.id,
                    CityId: artefact.CityId,
                    UserId: req.user.user.id
                })
            }

        return res.status(200).send(artefact)
    },

    async getCityArtefact(req, res, next){
        // const slug = req.slug;

        // console.log(slug)
        const cityartefact = await City.findAll({  
            include: [
                {
                model: Artefact
                }
            ]});
        return res.status(200).send(cityartefact)
    },
    
    

    async getCities(req, res, next){
        // const slug = req.slug;

        // console.log(slug)
        const cities = await City.findAll({  
            include: [
                {
                model: CityArtefactCount
                }
            ],where: {
                id: 5}});

        const cityArtefacts = await Artefact.findAll({
            where: {
                cityId: 5
            }
        })
        return res.status(200).send({cities,cityArtefacts})
    }
    
    };
    
    export default UserController;