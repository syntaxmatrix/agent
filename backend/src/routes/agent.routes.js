import { Router } from "express";
import { 
    intentCheck,
} from "../controllers/agent.controller.js";
import { auth_middleware } from "../middlewares/auth.js";

const router = Router();

router.route("/ask").get(auth_middleware, intentCheck); // GET :: example.com/api/v1/agent/test?q=abc

export default router;
