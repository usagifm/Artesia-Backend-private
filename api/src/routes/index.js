import passport from "passport";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import AdminAuthController from "../controllers/Admin/AuthController";
import CityAdminController from "../controllers/Admin/CityAdminController";
import ArtefactAdminController from "../controllers/Admin/ArtefactAdminController";
import AdminArticleController from "../controllers/Admin/ArticleAdminController"

const { checkToken, checkTokenAdmin } = require("../auth/token_validation")

const routes = (app) => {


    // User Endpoint

    app.get('/', checkToken , (req, res) => res.send('Welcome to Artesia Backend Server ! this is user id =  ' + req.userId ));
    app.post("/oauth/google", passport.authenticate('google-token', { session: false }), AuthController.googleLogin);
    app.get("/api/user", checkToken , UserController.getUserDetail);
    app.get("/api/artefact", checkToken , UserController.getArtefactDetail);
    app.get("/api/cityartefact", checkToken , UserController.getCityArtefact);
    app.get("/api/getcities", checkToken , UserController.getCities);


    // Admin Endpoint
    app.post("/api/admin/oauth/google", passport.authenticate('google-token', { session: false }), AdminAuthController.adminGoogleLogin);
    
    // Admin City 
    app.get("/api/admin/cities", checkTokenAdmin , CityAdminController.getCities);
    app.get("/api/admin/city/:id", checkTokenAdmin , CityAdminController.getCity);
    app.post("/api/admin/city/create", checkTokenAdmin , CityAdminController.addCity);
    app.put("/api/admin/city/:id/update", checkTokenAdmin , CityAdminController.updateCity);
    app.delete("/api/admin/city/:id/delete", checkTokenAdmin , CityAdminController.deleteCity);

    // Admin City Artefact
    app.get("/api/admin/city/:CityId/artefact/:id", checkTokenAdmin , ArtefactAdminController.getArtefact);
    app.post("/api/admin/city/:CityId/artefact/create", checkTokenAdmin , ArtefactAdminController.addArtefact);
    app.put("/api/admin/city/:CityId/artefact/:id/update", checkTokenAdmin , ArtefactAdminController.updateArtefact);
    app.delete("/api/admin/city/:CityId/artefact/:id/delete", checkTokenAdmin , ArtefactAdminController.deleteArtefact);

    // Admin Article
    app.get("/api/admin/articles/", checkTokenAdmin , AdminArticleController.getArticles);
    app.get("/api/admin/article/:id", checkTokenAdmin , AdminArticleController.getArticle);
    app.post("/api/admin/article/create", checkTokenAdmin , AdminArticleController.addArticle);
    app.put("/api/admin/article/:id/update", checkTokenAdmin , AdminArticleController.updateArticle);
    app.delete("/api/admin/article/:id/delete", checkTokenAdmin , AdminArticleController.deleteArticle);
    app.put("/api/admin/article/:id/publish", checkTokenAdmin , AdminArticleController.publishArticle);
    app.put("/api/admin/article/:id/unpublish", checkTokenAdmin , AdminArticleController.unpublishArticle);

    // Admin Article Category
    app.get("/api/admin/categories", checkTokenAdmin , AdminArticleController.getCategories);
    app.post("/api/admin/category/create", checkTokenAdmin , AdminArticleController.addCategory);
    app.put("/api/admin/category/:slug/update", checkTokenAdmin , AdminArticleController.updateCategory);
    app.delete("/api/admin/category/:slug/delete", checkTokenAdmin , AdminArticleController.deleteCategory);

    // Admin Article Sub Category
    app.get("/api/admin/subcategories", checkTokenAdmin , AdminArticleController.getSubCategories);
    app.post("/api/admin/subcategory/create", checkTokenAdmin , AdminArticleController.addSubCategory);
    app.put("/api/admin/subcategory/:slug/update", checkTokenAdmin , AdminArticleController.updateSubCategory);
    app.delete("/api/admin/subcategory/:slug/delete", checkTokenAdmin , AdminArticleController.deleteSubCategory);
    
};

export default routes;

