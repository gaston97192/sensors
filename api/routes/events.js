
const { Router } = require('express');

const { eventsGet,
        eventsSave,
                  } = require('../controllers/events');

const router = Router();


router.get('/', eventsGet );

router.post('/', eventsSave );



module.exports = router;