const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const isAdmin = require('../middlewares/is-admin');
const isAuth = require("../middlewares/is-auth")

const route = "/categories";

router.use((req, res, next) => {
    res.locals.page = "products";
    next();
});

router.get(`${route}/list`, categoryController.listCategory);
router.get(`${route}/all`, categoryController.getCategories);
router.get(`${route}/create`, categoryController.createCategoryPage);
router.post(`${route}/create`, isAuth, isAdmin, categoryController.createCategory);
router.get(`${route}/:id`, categoryController.showCategory);
router.get(`${route}/:id/edit`, categoryController.updateCategoryPage,);
router.post(`${route}/:id/edit`, isAuth, isAdmin, categoryController.updateCategory);
router.post(`${route}/:id/delete`, isAuth, isAdmin, categoryController.deleteCategory);

module.exports = router;