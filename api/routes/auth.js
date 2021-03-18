
const { Router } = require('express');

const { generateToken} = require('../controllers/auth');

const router = Router();


router.post('/', generateToken );

module.exports = router;