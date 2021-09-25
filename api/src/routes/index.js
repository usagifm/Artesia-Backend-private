import passport from "passport";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import AdminAuthController from "../controllers/Admin/AuthController";
import CityAdminController from "../controllers/Admin/CityAdminController";
import ArtefactAdminController from "../controllers/Admin/ArtefactAdminController";
import ArticleAdminController from "../controllers/Admin/ArticleAdminController";
import TourismAdminController from "../controllers/Admin/TourismAdminController";

const { checkToken, checkTokenAdmin } = require("../auth/token_validation")

const routes = (app) => {


    // User Endpoint
    app.get('/', checkToken , (req, res) => res.send('Welcome to Artesia Backend Server ! this is user id =  ' + req.user.user.id ));

    // User Google Sign In
    app.post("/api/user/oauth/google", passport.authenticate('google-token', { session: false }), AuthController.googleLogin);

    // User Profile
    app.get("/api/user/profile", checkToken , UserController.getProfile);
    app.put("/api/user/profile/update", checkTokenAdmin , UserController.updateProfile);

    // User Artefacts
    app.get("/api/user/artefact/:slug", checkToken , UserController.getArtefactDetail);
    app.get("/api/user", checkToken , UserController.getUserDetail);


    // User Articles
    app.get("/api/user/articles", UserController.getArticles);
    app.get("/api/user/article/:slug", UserController.getArticle);
    

    

    // app.get("/api/user", checkToken , UserController.getUserDetail);
    // app.get("/api/artefact/:slug", checkToken , UserController.getArtefactDetail);
    // app.get("/api/cityartefact", checkToken , UserController.getCityArtefact);
    // app.get("/api/getcities", checkToken , UserController.getCities);



    // Admin Google Sign In
    app.post("/api/admin/oauth/google", passport.authenticate('google-token', { session: false }), AdminAuthController.adminGoogleLogin);
    
    // Admin City 
    app.get("/api/admin/cities", checkTokenAdmin , CityAdminController.getCities);
    app.get("/api/admin/city/:id", checkTokenAdmin , CityAdminController.getCity);
    app.post("/api/admin/city/create", checkTokenAdmin , CityAdminController.addCity);
    app.put("/api/admin/city/:id/update", checkTokenAdmin , CityAdminController.updateCity);
    app.delete("/api/admin/city/:id/delete", checkTokenAdmin , CityAdminController.deleteCity);

    // Admin City Tourism
    app.get("/api/admin/city/:CityId/tourism/:id", checkTokenAdmin , TourismAdminController.getTourism);
    app.post("/api/admin/city/:CityId/tourism/create", checkTokenAdmin , TourismAdminController.addTourism);
    app.put("/api/admin/city/:CityId/tourism/:id/update", checkTokenAdmin , TourismAdminController.updateTourism);
    app.delete("/api/admin/city/:CityId/tourism/:id/delete", checkTokenAdmin , TourismAdminController.deleteTourism);

    // Admin City Tourism Artefact
    app.get("/api/admin/city/:CityId/tourism/:TourismId/artefact/:id", checkTokenAdmin , ArtefactAdminController.getArtefact);
    app.post("/api/admin/city/:CityId/tourism/:TourismId/artefact/create", checkTokenAdmin , ArtefactAdminController.addArtefact);
    app.put("/api/admin/city/:CityId/tourism/:TourismId/artefact/:id/update", checkTokenAdmin , ArtefactAdminController.updateArtefact);
    app.delete("/api/admin/city/:CityId/tourism/:TourismId/artefact/:id/delete", checkTokenAdmin , ArtefactAdminController.deleteArtefact);

    // Admin Article
    app.get("/api/admin/articles/", checkTokenAdmin , ArticleAdminController.getArticles);
    app.get("/api/admin/article/:id", checkTokenAdmin , ArticleAdminController.getArticle);
    app.post("/api/admin/article/create", checkTokenAdmin , ArticleAdminController.addArticle);
    app.put("/api/admin/article/:id/update", checkTokenAdmin , ArticleAdminController.updateArticle);
    app.delete("/api/admin/article/:id/delete", checkTokenAdmin , ArticleAdminController.deleteArticle);
    app.put("/api/admin/article/:id/publish", checkTokenAdmin , ArticleAdminController.publishArticle);
    app.put("/api/admin/article/:id/unpublish", checkTokenAdmin , ArticleAdminController.unpublishArticle);

    // Admin Article Category
    app.get("/api/admin/categories", checkTokenAdmin , ArticleAdminController.getCategories);
    app.get("/api/admin/category/:slug", checkTokenAdmin , ArticleAdminController.getCategory);
    app.post("/api/admin/category/create", checkTokenAdmin , ArticleAdminController.addCategory);
    app.put("/api/admin/category/:slug/update", checkTokenAdmin , ArticleAdminController.updateCategory);
    app.delete("/api/admin/category/:slug/delete", checkTokenAdmin , ArticleAdminController.deleteCategory);

    // Admin Article Sub Category
    
    app.get("/api/admin/category/:CategorySlug/subcategories", checkTokenAdmin , ArticleAdminController.getSubCategories);
    app.post("/api/admin/category/:CategorySlug/subcategory/create", checkTokenAdmin , ArticleAdminController.addSubCategory);
    app.put("/api/admin/category/:CategorySlug/subcategory/:slug/update", checkTokenAdmin , ArticleAdminController.updateSubCategory);
    app.delete("/api/admin/category/:CategorySlug/subcategory/:slug/delete", checkTokenAdmin , ArticleAdminController.deleteSubCategory);
    
};

export default routes;

