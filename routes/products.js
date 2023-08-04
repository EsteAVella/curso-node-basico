const { Router } = require('express');
const { check } = require('express-validator');

const { checkFields } = require('../middlewares/validar-campos');
const { JWTvalidator, adminRole } = require('../middlewares');
const { createProduct, getProducts, getProduct, putProduct, deleteProduct } = require('../controllers/products.controller');
const { existCategorieId, existProductId } = require('../helpers/db-validators');

const router = Router();

//obtiene todas las categorias
router.get ('/', getProducts);

//obtiene una de las categorias
router.get('/:id',[
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existProductId ),
    checkFields,    
], getProduct );

//Cualquiera puede crear la categoria
router.post('/',[
    JWTvalidator,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('categorie', "No es un ID valido").isMongoId(),
    check('categorie').custom( existCategorieId ),
    checkFields,
], createProduct);

//Actualizar una categoria
router.put('/:id',[
    JWTvalidator,
    check('categorie', "No es un ID valido").isMongoId(),
    check('id').custom( existProductId ),
    checkFields
]
,putProduct);

//Delete - solo SI ES ADMIN
router.delete('/:id',[
    JWTvalidator,
    adminRole,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existProductId ),
    checkFields    
], deleteProduct);


module.exports = router;
