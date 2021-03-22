
const { Router } = require('express');

const { generateToken, validateToken} = require('../controllers/auth');


const router = Router();

router.post('/', generateToken );

router.get('/', validateToken );


module.exports = router;