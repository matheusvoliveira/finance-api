import express from "express";
import cors from "cors";
import transactionsRouter from "./modules/transactions/routes/transactions.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
