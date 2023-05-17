import express from "express";
import { autentication } from "../middlware/autentication";
const router = express.Router()

router.use('/autentication', autentication)

export default router