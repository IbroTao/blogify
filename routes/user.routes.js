const {Router} = require('express');
const {loginUser,registerUser} = require('../controllers/auth.controllers');
const { updateBio, getMe } = require('../controllers/user.controllers');
const {authorizeUser} = require('../middlewares/auth.middlewares')

const router = Router();

router.get('/me', authorizeUser, getMe)

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/update/bio', authorizeUser, updateBio);


module.exports = router;