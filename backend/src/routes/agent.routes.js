import { Router } from "express";
import { 
    testfun,
    parserController
} from "../controllers/agent.controller.js";

const router = Router();

router.route("/test").get(testfun); // GET :: example.com/api/v1/agent/test

router.route("/ask").get(parserController); // GET :: example.com/api/v1/agent/ask?q=abc

export default router;
