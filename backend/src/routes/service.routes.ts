import { Router } from "express";
import { getServiceById, getServices, postService } from "../controller/service.controller";
import { requiredAuth } from "../middleware/requiredAuth";

const router = Router();

router.get('/getservices', getServices);
router.post('/postservice', requiredAuth, postService);
router.get('/servicebyid', requiredAuth, getServiceById);
export default router;
