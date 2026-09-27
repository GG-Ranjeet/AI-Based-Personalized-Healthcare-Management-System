import express, { type Express, type Request, type Response } from "express";
import statusRoutes from "../routes/statusRoutes.ts";
import patientRoutes from "../routes/patientRoutes.ts";
import { globalErrorHandler } from "../middleware/GlobalErrorHandler.ts";
import loginRoutes from "../routes/loginRoute.ts";
import signupRoutes from "../routes/signupRoute.ts";
import dashboardRoute from "../routes/dashboardRoute.ts"; // Import the dashboard route
import { authenticateToken } from "../middleware/auth/AuthenticateToken.ts";
import aiRecommenderRoute from "../routes/aiRecommenderRoute.ts";

const app: Express = express();
app.use(express.json());

// Routes
app.use("/api/status", statusRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/login", loginRoutes); 
app.use("/api/signup", signupRoutes); 
app.use("/api/chat", aiRecommenderRoute);
app.use("/api/dashboard", authenticateToken, dashboardRoute); 

app.use((req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(globalErrorHandler);

// Default
app.get("/", (req: Request, res: Response) => {
    res.status(404).json({
                success: false, message: 'Not Valid Route'
            });
});

export default app;
