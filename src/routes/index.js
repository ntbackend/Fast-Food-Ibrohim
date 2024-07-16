const { Router } = require("express");
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const adminRoutes = require("./admin.route")
const authRoute = require("./auth.route");
const router = Router();

router.use(categoryRoutes);
router.use(productRoutes);
router.use(adminRoutes);
router.use(authRoute);

module.exports = router;