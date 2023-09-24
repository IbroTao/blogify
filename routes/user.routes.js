const {Router} = require('express');
const {loginUser,registerUser} = require('../controllers/auth.controllers');
const { updateBio, getMe, getUserById, updateProfilePicture } = require('../controllers/user.controllers');
const {authorizeUser} = require('../middlewares/auth.middlewares')
const {mediaParser} = require('@dolphjs/core')

const router = Router();

router.get('/me', authorizeUser, getMe);
router.get('/:userid', getUserById);

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/update/bio', authorizeUser, updateBio);
router.put('/update/pics', authorizeUser, mediaParser({fieldname: "upload", type: "single"}), updateProfilePicture)


module.exports = router;