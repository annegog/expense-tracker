const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, date, category, description, type, active } = req.body;
    const income = Income({
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

        await income.save();
        res.status(200).json({ message: "Changes have been saved" });
    } catch (error) {
        res.status(500).json({ message: "ERROR!! Try in a little bit" });
    }

    console.log(income);
};

exports.getIncome = async (req, res) => {
    try {
        const income = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "ERROR! Try later!" });
    }
};

// Automatically delete the data of an income that has been deactivated 
// for a period of time 
// or if the user decides to delete it permanently.

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    Income.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: "It is now deleted" });
        })
        .catch((error) => {
            res.status(500).json({ message: "ERROR! Try later!" });
        });
};

// We don't delete the data; we simply deactivate it 
// for a period of time so the user can reactivate it later if needed.
exports.deActivateIncome = async (req, res) => {
    const { id } = req.params;

    Income.findById(id)
        .then((income) => {
            if (!income) {
                return res.status(404).json({ message: "Income not found" });
            }
            income.active = false;
            return income.save();
        })
        .then(() => {
            res.status(200).json({ message: "It is now on the trash" })
        })
        .catch((error) => {
            res.status(500).json({ message: "ERROR! Try later!" });
        });
};

// Reactivate the data
exports.reActivateIncome = async (req, res) => {
    const { id } = req.params;

    Income.findById(id)
        .then((income) => {
            if (!income) {
                return res.status(404).json({ message: "Income not found" });
            }
            income.active = true;
            return income.save();
        })
        .then(() => {
            res.status(200).json({ message: "It is now back on your dashboard" })
        })
        .catch((error) => {
            res.status(500).json({ message: "ERROR! Try later!" });
        });
};
