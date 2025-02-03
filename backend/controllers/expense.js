const Expense = require("../models/ExpenseModel");

exports.addExpense= async (req, res) => {
    const { title, amount, date, category, description, type, active } = req.body;
    const expense = Expense({
        title,
        amount,
        category,
        description,
        type,
        date,
        active,
    });

    try {
        if (!title || !category || !amount)
            return res.status(400).json({ message: "Some filds are mandatory!" });
        if (typeof amount !== "number")
            return res.status(400).json({ message: "Amount must be a number" });

        await expense.save();
        res.status(200).json({ message: "New Expenses have been saved" });
    } catch (error) {
        res.status(500).json({ message: "ERROR!! Try in a little bit" });
    }

    console.log(expense);
};

exports.getExpense = async (req, res) => {
    try {
        const expense = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "ERROR! Try later!" });
    }
};

// Automatically delete the data of an expense that has been deactivated 
// for a period of time 
// or if the user decides to delete it permanently.

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    Expense.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: "It is now deleted" });
        })
        .catch((error) => {
            res.status(500).json({ message: "ERROR! Try later!" });
        });
};

// We don't delete the data; we simply deactivate it 
// for a period of time so the user can reactivate it later if needed.
exports.deActivateExpense = async (req, res) => {
    const { id } = req.params;

    Expense.findById(id)
        .then((expense) => {
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            expense.active = false;
            return expense.save();
        })
        .then(() => {
            res.status(200).json({ message: "It is now on the trash" })
        })
        .catch((error) => {
            res.status(500).json({ message: "ERROR! Try later!" });
        });
};

// Reactivate the data
exports.reActivateExpense= async (req, res) => {
    const { id } = req.params;

    Expense.findById(id)
        .then((expense) => {
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            expense.active = true;
            return expense.save();
        })
        .then(() => {
            res.status(200).json({ message: "It is now back on your dashboard" })
        })
        .catch((error) => {
            res.status(500).json({ message: "ERROR! Try later!" });
        });
};
