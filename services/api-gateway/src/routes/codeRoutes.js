import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { runCode } from "../utils/codeExecutor.js";

const router = express.Router();

router.post("/run", authMiddleware, async (req, res) => {
  try {
    const { code } = req.body;

    const result = await runCode(code);

    return res.json(result); // 👈 IMPORTANT
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;