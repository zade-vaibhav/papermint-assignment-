import express from "express";
import { authenticateUser } from "./authenticateUser.js";
import expenceModel from "../Model/expenceModel.js";

const router = express.Router();

// Add Expense or Income Entry
router.post("/add", authenticateUser, async (req, res) => {
    try {
        const { amount, description, date, type } = req.body;

        if (!amount || !description || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const entry = new expenceModel({
            userId: req.user.id, // Get userId from token
            amount,
            description,
            date,
            type,
        });

        const savedEntry = await entry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get All Entries for a User
router.get("/entries", authenticateUser, async (req, res) => {
    try {
        const entries = await expenceModel.find({ userId: req.user.id }); // Get userId from token
        res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete an Entry
router.delete("/:id", authenticateUser, async (req, res) => {
    try {
        console.log("delete")
        const { id } = req.params;
        console.log(id)
        // Find the entry and ensure it belongs to the user
        const entry = await expenceModel.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!entry) {
            return res.status(404).json({ message: "Entry not found or unauthorized" });
        }

        res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
);

export default router;
