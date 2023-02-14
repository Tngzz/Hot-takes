const express = require('express');
const router = express.Router();

console.log("router stuff");

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// const multer = require('../middleware/multer-config_');

// router.use((req,res,next)=>{
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     req.auth = {userId}
// })

router.post('/', multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllStuff);


router.post('/ok', auth, multer, stuffCtrl.createThing);


module.exports = router;