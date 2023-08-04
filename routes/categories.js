const { Router } = require('express');
const { check } = require('express-validator');

const { checkFields } = require('../middlewares/validar-campos');
const { JWTvalidator, reqRols, adminRole } = require('../middlewares');
const { createCategorie, getCategories, getCategorie, putCategorie, deleteCategorie } = require('../controllers/categories.controler');
const { existCategorieId } = require('../helpers/db-validators');

const router = Router();

//obtiene todas las categorias
router.get ('/', getCategories);

//obtiene una de las categorias
router.get('/:id',[
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existCategorieId ),
    checkFields,    
], getCategorie );

//Cualquiera puede crear la categoria
router.post('/',[
    JWTvalidator,
    check('name','El nombre es obligatorio').not().isEmpty(),
    checkFields,
], createCategorie);

//Actualizar una categoria
router.put('/:id',[
    JWTvalidator,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existCategorieId ),
    checkFields
]
,putCategorie);

//Delete - solo SI ES ADMIN
router.delete('/:id',[
    JWTvalidator,
    adminRole,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existCategorieId ),
    checkFields    
], deleteCategorie);


module.exports = router;
