import { type Request, type Response, type NextFunction } from 'express';
import { logAuditEvent } from '../models/AuditLog.ts';

/**
 * Express middleware to automatically log API requests to the Audit Log.
 * 
 * @param action - A string describing the action (e.g. "VIEW_DASHBOARD", "UPDATE_MEDICINE")
 * @param resourceType - The resource being affected (e.g. "User", "Medicine", "System")
 */
export const auditMiddleware = (action: string, resourceType: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // We wait for the request to finish so we can check the status code
        res.on('finish', async () => {
            try {
                // Determine success or failure based on status code
                let status = 'SUCCESS';
                if (res.statusCode >= 400 && res.statusCode < 500) status = 'WARNING';
                if (res.statusCode >= 500) status = 'FAILURE';

                // Extract actor details from JWT token payload (attached to req.user)
                const actorId = req.user?.id || req.user?.userId || 'system';
                const actorRole = req.user?.role || 'unknown';

                // Extract client details
                const ip = req.ip || req.socket.remoteAddress;
                const userAgent = req.headers['user-agent'];

                // Try to identify specific resource ID from params
                const resourceId = req.params.id || null;

                // Create a sanitized copy of the body (hide passwords)
                let sanitizedBody = { ...req.body };
                if (sanitizedBody.password) sanitizedBody.password = '***';

                const details = {
                    method: req.method,
                    url: req.originalUrl,
                    statusCode: res.statusCode,
                    body: sanitizedBody,
                };

                await logAuditEvent({
                    actorId,
                    actorRole,
                    action,
                    resourceType,
                    resourceId,
                    status,
                    ip,
                    userAgent,
                    details
                });
            } catch (error) {
                console.error("Error in audit middleware:", error);
            }
        });

        next();
    };
};
