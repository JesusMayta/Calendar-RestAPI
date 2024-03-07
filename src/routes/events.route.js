const { Router } = require('express');
const { validateJWT, validateFields } = require('../middlewares');
const { GetEvents, CreateEvent, UpdateEvent, DeleteEvent } = require('../controllers/events.controller');
const { check } = require('express-validator');
const { isDate, IdEventExist } = require('../helpers');

const router = Router();

router.use(validateJWT);

router.get('/', GetEvents);

router.post('/create', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalización es obligatorio').custom(isDate),
    validateFields
], CreateEvent);

router.put('/update/:id', [
    check('id', 'El Id es obligatorio').custom(IdEventExist),
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalización es obligatorio').custom(isDate),
    validateFields
], UpdateEvent);

router.delete('/delete/:id', [
    check('id', 'El Id es obligatorio').custom(IdEventExist),
    validateFields
], DeleteEvent);

module.exports = router;