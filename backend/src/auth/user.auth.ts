import { Router } from "express";
import {  userAuthorization, userLogin, userLogout, userSignUp } from "../controller/user.controller";
import { requiredAuth } from "../middleware/requiredAuth";


const router = Router();

router.post("/signup",  userSignUp);
router.post("/login", userLogin);
router.get('/userauthorization', requiredAuth,  userAuthorization);
router.get('/logout', userLogout);

export default router;
