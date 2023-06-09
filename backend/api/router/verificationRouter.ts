import express from "express";
import { autentication } from "../controllers/autentication";
import { getToken } from "../controllers/getToken";
const router = express.Router()

router.use('/api/autentication', autentication)
router.use('/api/gettoken', getToken)


export default router