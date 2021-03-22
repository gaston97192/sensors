const { Router } = require('express');
const { validateJWT } = require('../helpers/validateToken');


const { eventsGet,
        eventsSave,
        eventsGetById,
        eventsDelete,
        eventsUpdate
                  } = require('../controllers/events');

const router = Router();


router.get('/', [validateJWT], eventsGet );

router.post('/', [validateJWT], eventsSave );

router.get('/:id', [validateJWT], eventsGetById );


router.put('/:id', [validateJWT], eventsUpdate );


router.delete('/:id', [validateJWT], eventsDelete );

module.exports = router;