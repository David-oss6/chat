import jwt from "jsonwebtoken"
import { Request, Response } from 'express'
const secretKey: string = process.env.JWT_KEY!


export const autentication = (req: Request, res: Response) => {
  const token = req.headers["x-access-token"]

  if (!token) {
    return res.status(401).send({ error: "Necesario token para autenticacion" })
  }

  if (typeof token === 'string') {
    const decoded = jwt.verify(token, secretKey)
    console.log(decoded)
    return res.json('yes')
  }
}



