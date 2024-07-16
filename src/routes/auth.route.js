const { Router } = require('express');
const router = Router();
const { login, loginPage } = require('../controllers/auth.controller');

const route = "/auth"

router.get(`${route}/login`, loginPage);
router.post(`${route}/login`, login);

module.exports = router;
