const { Router } = require('express');
const { validateJWT } = require('../helpers/validateToken');

const { sensorsGet,
        sensorsGetById,
        sensorsUpdate,
        sensorsSave,
        sensorsDelete,
        getEventsOfSensor
                     } = require('../controllers/sensors');

const router = Router();


router.get('/', [validateJWT], sensorsGet );

router.get('/:id', [validateJWT], sensorsGetById );

router.get('/events/:sensorId', [validateJWT], getEventsOfSensor );

router.put('/:id', [validateJWT], sensorsUpdate );

router.post('/', [validateJWT], sensorsSave );

router.delete('/:id', [validateJWT], sensorsDelete );


module.exports = router;