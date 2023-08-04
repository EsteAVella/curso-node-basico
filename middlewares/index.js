
const  checkFields = require('../middlewares/validar-campos');
const  JWTvalidator = require('../middlewares/jwt-validate');
const  adminRole = require('../middlewares/rols-validate');
const  reqRols = require('../middlewares/rols-validate');
const  fileValidator = require('../middlewares/file-validate');

module.exports ={
    ...JWTvalidator,
    ...checkFields,
    ...adminRole,
    ...reqRols,
    ...fileValidator,
}