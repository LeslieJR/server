const {Router} = require('express');
const controllers = require('../controllers')
const multer = require('multer');
const config = require('../config')

const router = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, config.imageFolder)
    },
    filename:function(req, file, cb){
        const uniqueSuffix =Date.now() + '.jpeg';
        const error = null;
        cb(error, file.filename + uniqueSuffix)
    }
})
const uploads = multer({
    //dest: './src/static/'
    storage: storage,
    limits:{
        fileSize: 100000
    }
})

router.post('/sign-in', controllers.user.signIn)
router.post('/sign-up', uploads.single('avatar'),controllers.user.signUp)

module.exports = router;