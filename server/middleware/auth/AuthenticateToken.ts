import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { IJWTPayload } from '../../customInterfaces.ts';



// 1. Middleware to verify Bearer Token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.header);
  const authHeader = req.headers['authorization'];
  // Header format: "Bearer <TOKEN>"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret) as IJWTPayload;
    console.log("Decoded token payload:", decoded); // Debugging line to check the decoded payload
    req.user = decoded; // Attach decoded token payload to req
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};