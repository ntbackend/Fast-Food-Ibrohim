const { Router } = require('express');
const router = Router();
const adminController = require('../controllers/admin.controller');
const isAdmin = require('../middlewares/is-admin');
const isAuth = require("../middlewares/is-auth")

const route = "/admins"

router.get(`${route}/all`, isAuth, isAdmin, adminController.getAllAdmins);
router.post(`${route}/create`, isAuth, isAdmin, adminController.createAdmin);
router.put(`${route}/:id/edit`, isAuth, isAdmin, adminController.updateAdmin);
router.delete(`${route}/:id/delete`, isAuth, isAdmin, adminController.deleteAdmin);

module.exports = router;
