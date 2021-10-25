const {Router} = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const router = Router();

router.post('/new-comment',middlewares.auth.isOwner , controllers.comment.createComment)
router.get('/latest-comments', controllers.comment.latestComments)

module.exports = router;