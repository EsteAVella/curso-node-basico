const { Router } = require('express');
const { check } = require('express-validator');

const { isValidate, existMail, existId } = require('../helpers/db-validators')
const{ checkFields,
        JWTvalidator,
        adminRole,
        reqRols, 
} = require('../middlewares');

const { userGet,
        userDelete,
        userPatch,
        userPut,
        userPost 
} = require('../controllers/user.controler');

const router = Router();

router.get('/', userGet);

router.put('/:id',[
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existId ),
    check('rol').custom( isValidate ),
    checkFields
],userPut );

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 caracteres').isLength({min: 6}),
    check('mail').custom( existMail ),
    check('rol').custom( isValidate ),
    checkFields,
] ,userPost );

router.delete('/:id',[
    JWTvalidator,
    // adminRole,
    reqRols('ADMIN_ROLE','SALES_ROLE'),
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existId ),
    checkFields,
], userDelete );

router.patch('/', userPatch);

module.exports = router