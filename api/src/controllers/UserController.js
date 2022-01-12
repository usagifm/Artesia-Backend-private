import { User, Artefact, City, UserArtefact,CityArtefactCount,Tourism,Article, Category, SubCategory     } from "../db/models";
import cloudinary from "../helper/imageUpload"
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

import { pagination } from "../helper/pagination"



const UserController = {

    async getProfile(req, res, next){
        
        try{
        const user = await User.findOne({
        where: {id : req.user.user.id}});
        return res.status(200).send(user)

            } catch (error) {
                console.log(error)
                res.status(400).send(error)
            }

    },



//  async updateProfilePhoto(req, res, next) {
//         if (req.user.user.role != 'Admin') {
//             return res.status(401).send({ error: 'Your are not an Admin !' })
//         }

//         // const user = await User.findOne({
//         //     where: {id : req.user.user.id}});

//         const result = await cloudinary.uploader.upload(req.body.photo, {
//             public_id: `${req.user.user.id}_profile`,
//         })


//         await User.update({
//             photo: result.secure_url
//         }, {
//             where: {
//                 id: req.user.user.id
//             }
//         });

//         res.status(200).send({"message" : "Photo updated succesfully"})



//     },



    async updateProfile(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }

        if(req.body.photo != null && req.body.photo != ""){
            try {
            const result = await cloudinary.uploader.upload(req.body.photo, {
                public_id: `${req.user.user.id}_profile`,
                quality: 60
            })

            req.body.photo = result.secure_url
                } catch (err) {
                    res.status(400).send(err)
                }

        }

        try{
        await User.update({
            name: req.body.name,
            photo: req.body.photo
        }, {
            where: {
                id: req.user.user.id,
            }
        });

    }catch (err){
        res.status(400).send(err)
    }



        const user = await User.findByPk(req.user.user.id);


        res.status(200).send(user)
    },

    async getUserDetail(req, res, next){
        
        try {
        const user = await User.findOne({include: [
            {model: City, include: [{model: Artefact, include:{model: Tourism}},
            {model:CityArtefactCount}]}
         
        ],
        where: {id : req.user.user.id}});
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    },

    async getUserRecentArtefacts(req, res, next){
        
    try {
        const user = await UserArtefact.findAll({include: [
            {model: Artefact, include: {model: Tourism }}
        ],
        where: {UserId : req.user.user.id},
        limit: 3,
        order: [['createdAt', 'DESC']]
        });
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    },



    async getArtefactDetail(req, res, next){

        try {
        const artefact = await Artefact.findOne({  
            include: [
                {
                model: City
                },
                {
                    model: Tourism
                    },
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

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    },

    async getCityArtefact(req, res, next){
        // const slug = req.slug;

        // console.log(slug)

        try {
        const cityartefact = await City.findAll({  
            include: [
                {
                model: Artefact
                }
            ]});
        return res.status(200).send(cityartefact)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    },
    
    

    async getCities(req, res, next){
        // const slug = req.slug;

        // console.log(slug)
        try {
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

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    },

    async getArticles(req,res,next){

        try{
            const where = {};
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const per_page = req.query.page ? parseInt(req.query.per_page) : 1;
            const {CategorySlug, SubCategorySlug, searchByTitle} = req.query;
            where.is_published = true;
            if (searchByTitle) where.title = { [Op.like]: `%${searchByTitle}%`}
            if (CategorySlug) where.CategorySlug = { [Op.eq]: CategorySlug}
            if (SubCategorySlug) where.SubCategorySlug = { [Op.eq]: SubCategorySlug}
            

            const offset = 0 + (req.query.page - 1) * per_page

            const { count, rows } = await Article.findAndCountAll({
                include: [{model: User}],
                where,
                offset: offset,
                limit: per_page,
                distinct: true,
                order: [['published_at', 'ASC']]
                
            });
            console.log(pagination)
            const result = pagination({
                data: rows,
                count,
                page,
                per_page
            });
            if(rows <= 0){
                res.status(404).send({
                    message: 'Oops, no article found'
                })
            }

            return res.status(200).send(result )

        }catch (err){
            res.status(400).send(err)
        }



    },
    
    async getArticle(req, res, next) {

    
        const article = await Article.findOne({
            include: [
                
                {
                    model: Category
                    },
                    {
                        model: SubCategory
                        },

                   {model: User}
            ],where: {
                slug: req.params.slug}});

        if (!article) {
            res.status(400).send({
                "message": "Record not found"
            })
        }
        return res.status(200).send(article)
    },


    async getRecentArticles(req,res,next){

        try{
            const rows = await Article.findAll({
                include: [{model: User},    {
                    model: Category
                    },],
                limit: 5,
                where: {is_published: true},
                order: [['createdAt', 'DESC']]
                
            });
    
            if(rows <= 0){
                res.status(404).send({
                    message: 'Oops, no article found'
                })
            }

            return res.status(200).send(rows )

        }catch (err){
            res.status(400).send(err)
        }



    },



    };


    
    
    export default UserController;