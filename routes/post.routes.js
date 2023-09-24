const {Router} = require('express');
const { createPost } = require('../controllers/post.controllers');
const {mediaParser} = require('@dolphjs/core');
const { authorizeUser } = require('../middlewares/auth.middlewares');

const router = Router();

router.post('/', authorizeUser, mediaParser({type: 'single', fieldname: 'upload'}), createPost);

module.exports = router;