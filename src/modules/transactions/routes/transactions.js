import express from "express";
import prisma from "../../../lib/prisma.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { title, amount, type, date } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        date: new Date(date),
      },
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, date } = req.body;
  try {
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        title,
        amount: parseFloat(amount),
        type,
        date: new Date(date),
      },
    });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
