const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const isAdmin = require('../middlewares/is-admin');
const isAuth = require("../middlewares/is-auth");

const route = "/products";

router.use((req, res, next) => {
    res.locals.page = "products";
    next();
});

router.get(`${route}/list`, productController.listProducts);
router.get(`${route}/all`, productController.getProducts);
router.get(`${route}/create`, productController.createProductPage);
router.get(`${route}/:id`, productController.showProduct);
router.get(`${route}/:id/edit`, productController.updateProductPage,);
router.post(`${route}/create`, isAuth, isAdmin, productController.createProduct);
router.post(`${route}/:id/edit`, isAuth, isAdmin, productController.updateProduct);
router.post(`${route}/:id/delete`, isAuth, isAdmin, productController.deleteProduct);

module.exports = router;