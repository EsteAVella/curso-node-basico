const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controler');
const { checkFields } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('mail', 'el correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    checkFields
], login );

router.post('/google',[
    check('id_token', 'El ID_Token es necesario').not().isEmpty(),    
    checkFields
], googleSignIn );


module.exports = router;