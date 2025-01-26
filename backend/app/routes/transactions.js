const { Router } = require('express');
const {getTransactions} = require('../controllers/transaction.controller');
const router = Router();


router.get('/',[
],getTransactions );
module.exports = router;