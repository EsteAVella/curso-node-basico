const { Router } = require('express');
const { check } = require('express-validator');

const { isValidate } = require('../helpers/db-validators')
const { checkFields } = require('../middlewares/validar-campos');

const { userGet, userDelete, userPatch, userPut, userPost } = require('../controllers/user.controler');

const router = Router();

router.get('/', userGet);

router.put('/:id', userPut);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 caracteres').isLength({min: 6}),
    check('mail', 'El correo no es de la forma example@example.com').isEmail(),
    check('rol').custom( isValidate ),
    checkFields,
] ,userPost );

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router