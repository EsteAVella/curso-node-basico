const { Router } = require('express');
const { userGet, userDelete, userPatch, userPut, userPost } = require('../controllers/user.controler');

const router = Router();

router.get('/', userGet);

router.put('/:id', userPut);

router.post('/', userPost);

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router