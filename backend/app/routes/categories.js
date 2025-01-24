const { Router } = require('express');
const {getCategories,newCategory,updateCategory} = require('../controllers/category.controller');
const router = Router();


router.get('/',[
],getCategories );
router.post('/',[
],newCategory );
router.patch('/:id',[
    
],updateCategory );
module.exports = router;