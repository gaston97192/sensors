
const { Router } = require('express');

const { sensorsGet,
        sensorsUpdate,
        sensorsSave,
        sensorsDelete,
                     } = require('../controllers/sensors');

const router = Router();


router.get('/', sensorsGet );

router.put('/:id', sensorsUpdate );

router.post('/', sensorsSave );

router.delete('/:id', sensorsDelete );


module.exports = router;