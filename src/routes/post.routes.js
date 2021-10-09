const {Router} = require('express');
const controllers = require('../controllers')
const router = Router();

router.post('/upload', controllers.post.upload)
router.get('/recent-uploads', controllers.post.recentUploads)
router.get('/stats', controllers.post.stats)
router.get('/most-popular', controllers.post.mostPopular)
router.post('/like', controllers.post.like);
router.get('/details/:id', controllers.post.details)
router.delete('/remove-post', controllers.post.remove)

module.exports = router;