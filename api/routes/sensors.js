const { Router } = require('express');
const { validateJWT } = require('../helpers/validateToken');

const { sensorsGet,
        sensorsUpdate,
        sensorsSave,
        sensorsDelete,
                     } = require('../controllers/sensors');

const router = Router();


router.get('/', [validateJWT], sensorsGet );

router.put('/:id', [validateJWT], sensorsUpdate );

router.post('/', [validateJWT], sensorsSave );

router.delete('/:id', [validateJWT], sensorsDelete );


module.exports = router;