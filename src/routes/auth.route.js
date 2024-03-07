const { Router } = require('express');
const { validateFields, validateJWT } = require('../middlewares');
const { LoginUser, RegisterUser, RevalidateToken } = require('../controllers');
const { check } = require('express-validator');
const { emailExist } = require('../helpers');

const router = Router();

router.post('/login', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password debe de ser de 8 caracteres').isLength({ min: 8 }),
    validateFields
], LoginUser);

router.post('/register', [
    check('email', 'El email es requerido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'El password debe de ser de 8 caracteres').isLength({ min: 8 }),
    check('name', 'El nombre es requerido').isString().not().isEmpty(),
    validateFields
], RegisterUser);

router.get('/renew', validateJWT, RevalidateToken);

module.exports = router;