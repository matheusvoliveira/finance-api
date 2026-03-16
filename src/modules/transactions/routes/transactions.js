import express from "express";
import prisma from "../../../lib/prisma.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const { title, amount, type, date } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !amount ||
      !date ||
      date.trim() === ""
    ) {
      const error = new Error("There is an empty field");
      error.status = 400;
      throw error;
    }

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
    next(err);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction) {
      const error = new Error("Transaction not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, type, date } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !amount ||
      !date ||
      date.trim() === ""
    ) {
      const error = new Error("There is an empty field");
      error.status = 400;
      throw error;
    }

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
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong with the server",
  });
});

export default router;
