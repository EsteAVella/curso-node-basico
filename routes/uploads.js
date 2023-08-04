const { Router } = require('express');
const { check } = require('express-validator');

const { checkFields } = require('../middlewares/validar-campos');
const { uploadFiles, accImg, showImg } = require('../controllers/uploads.controller');
const { colectionsOK } = require('../helpers/db-validators');
const { fileValidator } = require('../middlewares');

const router = Router();

router.post('/',[
    fileValidator,
], uploadFiles);

router.post('/google',[
    check('id_token', 'El ID_Token es necesario').not().isEmpty(),    
    checkFields
],);

router.put('/:colection/:id',[
    fileValidator, 
    check('id','el id debe ser de mongo').isMongoId(),
    check('colection').custom( c => colectionsOK (c ,['users','products'] ) ),
    checkFields
], accImg );

router.get('/:colection/:id',[
    fileValidator, 
    check('id','el id debe ser de mongo').isMongoId(),
    check('colection').custom( c => colectionsOK (c ,['users','products'] ) ),
    checkFields
], showImg );


module.exports = router;