const express = require('express');
const router = express.Router();

console.log("router sauces");

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// const multer = require('../middleware/multer-config_');

// router.use((req,res,next)=>{
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     req.auth = {userId}
// })

router.post('/', multer, saucesCtrl.createSauces);
router.post('/:id/like', multer, saucesCtrl.likeSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.get('/:id', auth, saucesCtrl.getOneSauces);
router.get('/', auth, saucesCtrl.getAllSauces);


// router.post('/ok', auth, multer, saucesCtrl.createSauces);


module.exports = router;