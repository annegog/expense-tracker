const express = require('express');
const router = express.Router();
const {addIncome} = require('../controllers/income');

// 
router.get('/transactions', (req, res) => {
    res.send('Transactions Route');
});

router.post('/addIncome', addIncome);


module.exports = router;
