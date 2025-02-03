const express = require('express');
const router = express.Router();
const {addIncome, getIncome, deleteIncome, deActivateIncome, reActivateIncome} = require('../controllers/income');
const { addExpense, getExpense, deleteExpense, deActivateExpense, reActivateExpense } = require('../controllers/expense');

// 
router.get('/transactions', (req, res) => {
    res.send('Transactions Route');
});

router.post('/add-income', addIncome)
    .get('/get-income', getIncome)
    .delete('/delete-income/:id', deleteIncome )
    .post('/deactivate-income/:id', deActivateIncome)
    .post('/reactivate-income/:id', reActivateIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/deactivate-expense/:id', deActivateExpense)
    .post('/reactivate-expense/:id', reActivateExpense)

module.exports = router;
