const { Router } = require('express');
const { validateJWT } = require('../helpers/validateToken');


const { eventsGet,
        eventsSave,
                  } = require('../controllers/events');

const router = Router();


router.get('/', [validateJWT], eventsGet );

router.post('/', [validateJWT], eventsSave );

module.exports = router;