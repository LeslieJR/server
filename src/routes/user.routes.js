const {Router} = require('express');
const controllers = require('../controllers');
const router = Router();
const uploads = require('../utils').multer

router.post('/sign-in', controllers.user.signIn)
router.post('/sign-up', uploads.single('avatar'),controllers.user.signUp)

module.exports = router;
