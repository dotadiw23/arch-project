const {Router} = require('express');
const router = Router();
const userController = require('../controllers/usersController')


router.get('/', userController.getUsers);

router.get('/:id', userController.getUser)

router.post('/', userController.postUser);

router.put('/:id', userController.putUser);

router.delete('/:id', userController.deleteuser);

module.exports = router;