import mongoose, { Schema, model, type InferSchemaType } from "mongoose";

const AuditLogSchema = new Schema(
    {
        timestamp: {
            type: Date,
            default: Date.now,
            required: true,
            index: -1 // Equivalent to DESC index in SQL
        },
        actor_id: {
            type: String,
            index: true // Equivalent to actor index in SQL
        },
        actor_role: {
            type: String
        },
        action: {
            type: String,
            required: true
        },
        resource_type: {
            type: String
        },
        resource_id: {
            type: String
        },
        status: {
            type: String,
            required: true,
            enum: ["SUCCESS", "FAILURE", "WARNING"]
        },
        ip_address: {
            type: String
        },
        user_agent: {
            type: String
        },
        details: {
            type: Schema.Types.Mixed // Equivalent to JSONB in SQL
        }
    },
    {
        // Add automatic createdAt and updatedAt fields
        timestamps: true
    }
);

export type IAuditLog = InferSchemaType<typeof AuditLogSchema>;
const AuditLog = mongoose.models.AuditLog || model("AuditLog", AuditLogSchema);

export async function logAuditEvent({ actorId, actorRole, action, resourceType, resourceId, status, ip, userAgent, details }: any) {
    try {
        await AuditLog.create({
            actor_id: actorId,
            actor_role: actorRole,
            action,
            resource_type: resourceType,
            resource_id: resourceId,
            status,
            ip_address: ip,
            user_agent: userAgent,
            details
        });
    } catch (error) {
        console.error("Failed to write audit log:", error);
    }
}

export default AuditLog;