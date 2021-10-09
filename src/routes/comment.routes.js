const {Router} = require('express');
const controllers = require('../controllers')
const router = Router();

router.post('/new-comment', controllers.comment.createComment)
router.get('/latest-comments', controllers.comment.latestComments)

module.exports = router;