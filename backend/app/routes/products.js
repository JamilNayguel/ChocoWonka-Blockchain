const { Router } = require('express');
const {getProducts,newProduct,updateProduct} = require('../controllers/product.controller');
const multer = require('multer')
const upload = multer();
const router = Router();


router.get('/',[
],getProducts );
router.post('/',[
    upload.single('path')
],newProduct );
router.patch('/:id',[
    upload.single('path')
],updateProduct );
module.exports = router;