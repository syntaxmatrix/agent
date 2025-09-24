import { Router } from "express";
import {funX} from "../agents/gemini.js";

const router = Router();

router.route("/test", async (req, res) => {  // example.com/api/v1/agent/test
  try {
    const text = await funX();
    res.json({ ok: true, text });
  } catch (err) {
    console.error("/gen error", err);
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
});

export default router;
