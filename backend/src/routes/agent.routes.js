import { Router } from "express";
import { 
    intentCheck,
} from "../controllers/agent.controller.js";

const router = Router();

router.route("/ask").get(intentCheck); // GET :: example.com/api/v1/agent/test?q=abc

export default router;
