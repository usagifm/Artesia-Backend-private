import { Article, Category , SubCategory  } from '../../db/models'

const ArtefactAdminController = {




    async addCategory(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        try {
            await Category.create({
                slug: req.body.slug,
                name: req.body.name,
                createdBy: req.user.user.id
            })
            res.status(200).send({"message": "Category created succesfully"})
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },

    
    async addSubCategory(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        try {
            await SubCategory.create({
                slug: req.body.slug,
                name: req.body.name,
                createdBy: req.user.user.id
            })
            res.status(200).send({"message": "Sub Category created succesfully"})
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    async updateCategory(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const slugcheck = await Category.findOne({where: {
            slug: req.params.slug,
        }});

        if (!slugcheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await Category.update(req.body, {
            where: {
                slug: req.params.slug,
            }
        });

        const updatedCategory = {
            slug: req.body.slug,
            name: req.body.name
        }

        res.status(200).send(updatedCategory)
    },

    async updateSubCategory(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const slugcheck = await SubCategory.findOne({where: {
            slug: req.params.slug,
        }});

        if (!slugcheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await SubCategory.update(req.body, {
            where: {
                slug: req.params.slug,
            }
        });

        const updateSubCategory = {
            slug: req.body.slug,
            name: req.body.name
        }

        res.status(200).send(updateSubCategory)
    },    
    async deleteCategory(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        const slugCheck = await Category.findOne({where: {
            slug: req.params.slug,
        }});
        if (!slugCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }
        await Category.destroy({
            where: {
                slug: req.params.slug,
            }
        });
        res.status(200).send({
            "message": "Category Deleted"
        })

    },

    async deleteSubCategory(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
       
        const slugCheck = await SubCategory.findOne({where: {
            slug: req.params.slug,
        }});

        if (!slugCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await SubCategory.destroy({
            where: {
                slug: req.params.slug,
            }
        });
        res.status(200).send({
            "message": "SubCategory Deleted"
        })

    },



    async getCategories(req, res, next) {

        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        const categories = await Category.findAll();

        if (!categories || categories == '') {
            res.status(400).send({
                "message": "Opps, Its Empty !"
            })
        }
        return res.status(200).send(categories)
    },


    async getSubCategories(req, res, next) {

        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        const subcategories = await SubCategory.findAll();

        if (!subcategories || subcategories == '') {
            res.status(400).send({
                "message": "Opps, Its Empty !"
            })
        }
        return res.status(200).send(subcategories)
    },

 
    async getArticles(req, res, next) {

        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        const articles = await Article.findAll();

        if (!articles || articles == '') {
            res.status(400).send({
                "message": "Opps, Its Empty !"
            })
        }
        return res.status(200).send(articles)
    },


    async getArticle(req, res, next) {

        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        const article = await Article.findByPk(req.params.id,{
            include: [
                {
                model: {Category,SubCategory}
                }
            ]});

        if (!article) {
            res.status(400).send({
                "message": "Record not found"
            })
        }
        return res.status(200).send(article)
    },


    

    async addArticle(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
        try {



            function convertToSlug(Text)
            {
                return Text
                    .toLowerCase()
                    .replace(/[^\w ]+/g,'')
                    .replace(/ +/g,'-')
                    ;
            }

            const slug = convertToSlug(req.body.title) 

            const articleCollection = await Article.create({
                slug: slug,
                title: req.body.title,
                CategorySlug: req.body.CategorySlug,
                SubCategorySlug: req.body.SubCategorySlug,
                thumbnail_url: req.body.SubCategorySlug,
                content: req.body.content,
                createdBy: req.user.user.id,
                flag: req.body.flag,
                is_published: 0,
                published_at: null,
                imgurl_1: req.body.imgurl_1,
                imgurl_2: req.body.imgurl_2,
                imgurl_3: req.body.imgurl_3,
                imgurl_4: req.body.imgurl_4,
                imgurl_5: req.body.imgurl_5,
            })
            res.status(200).send(articleCollection)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },



    async updateArticle(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await Article.findOne({where: {
            id: req.params.id,
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        function convertToSlug(Text)
        {
            return Text
                .toLowerCase()
                .replace(/[^\w ]+/g,'')
                .replace(/ +/g,'-')
                ;
        }

        let slug = convertToSlug(req.body.title) 

        


        await Article.update({
            slug: slug,
            title: req.body.title,
            CategorySlug: req.body.CategorySlug,
            SubCategorySlug: req.body.SubCategorySlug,
            thumbnail_url: req.body.SubCategorySlug,
            content: req.body.content,
            createdBy: req.user.user.id,
            flag: req.body.flag,
            is_published: 0,
            published_at: null,
            imgurl_1: req.body.imgurl_1,
            imgurl_2: req.body.imgurl_2,
            imgurl_3: req.body.imgurl_3,
            imgurl_4: req.body.imgurl_4,
            imgurl_5: req.body.imgurl_5,
        }, {
            where: {
                id: req.params.id,
            }
        });

        const updatedArticle = {
            slug: slug,
            title: req.body.title,
            CategorySlug: req.body.CategorySlug,
            SubCategorySlug: req.body.SubCategorySlug,
            thumbnail_url: req.body.SubCategorySlug,
            content: req.body.content,
            createdBy: req.user.user.id,
            flag: req.body.flag,
            imgurl_1: req.body.imgurl_1,
            imgurl_2: req.body.imgurl_2,
            imgurl_3: req.body.imgurl_3,
            imgurl_4: req.body.imgurl_4,
            imgurl_5: req.body.imgurl_5,
            createdBy: req.user.user.id
        }

        res.status(200).send(updatedArticle)
    },

    async deleteArticle(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }
       
        const idCheck = await Article.findOne({where: {
            id: req.params.id,
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        await Article.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).send({
            "message": "Article Deleted"
        })

    },


    
    async publishArticle(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await Article.findOne({where: {
            id: req.params.id,
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        let now = Date.now()

        await Article.update({
            published_at: now,
            is_published: 1
         }, {
            where: {
                id: req.params.id,
            }
        });


        res.status(200).send({
            "message": "Article Published!"
        })
    },



    async unpublishArticle(req, res, next) {
        if (req.user.user.role != 'Admin') {
            return res.status(401).send({ error: 'Your are not an Admin !' })
        }


        const idCheck = await Article.findOne({where: {
            id: req.params.id,
        }});

        if (!idCheck) {
            res.status(400).send({
                "message": "Record not found"
            })
        }

        let now = Date.now()

        await Article.update({
            published_at: null,
            is_published: 0
         }, {
            where: {
                id: req.params.id,
            }
        });


        res.status(200).send({"message": "Article Unpublished!"})
    },

   


};


export default ArtefactAdminController;