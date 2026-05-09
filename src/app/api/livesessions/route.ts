import db from "@/server/db";
import { liveSessions } from "@/server/db/schema";
import { checkIfUserIsAdmin, getUserIdFromSession, getUserTypeFromSession } from "@/utils/getUserIdFromSession";
import { sendResponse } from "@/utils/response";
import { liveSessionsSchema } from "@/validator/liveSessionValidator";
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { eq } from "drizzle-orm";
import { createGoogleMeetLink } from "@/utils/googleCalendar";




export const POST = async (request: Request) => {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const userId = await getUserIdFromSession();
    if (!userId) {
      return sendResponse(401, null, "Unauthorized");
    }
    const isAdmin = await checkIfUserIsAdmin();
    

    const userType = await getUserTypeFromSession();
    if (userType !== "investor" && !isAdmin) {
      return sendResponse(403, null, "Forbidden: Access is allowed only for investors and admin");
    }

    const data = liveSessionsSchema.safeParse(body);
    if (!data.success) {
      const errors = Object.fromEntries(
        Object.entries(data.error.flatten().fieldErrors).map(([k, v]) => [k, v ?? []])
      );
      return sendResponse(400, errors, "Validation failed");
    }

    const { title, description, scheduledAt, durationMinutes, isActive } = data.data;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof durationMinutes !== "number"
    ) {
      return sendResponse(400, null, "Validation failed: Missing or invalid fields.");
    }

    const meetingLink = await createGoogleMeetLink(
      title,
      description,
      new Date(scheduledAt),
      durationMinutes
    );

    await db.insert(liveSessions).values({
      hostId: userId as string,
      title,
      description: description,
      scheduledAt: new Date(scheduledAt),
      durationMinutes,
      meetingLink,
      isActive: isActive ?? false
    });

    return sendResponse(201, { meetingLink }, "Live session created successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return sendResponse(500, null, errorMessage); 
  }
};

export const GET = async (request: Request) => {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return sendResponse(401, null, "Unauthorized");
    }

    const sessions = await db.select().from(liveSessions).where(
      eq(liveSessions.hostId, userId)
    );

    const now = new Date();

    for (const session of sessions) {
      const scheduledDate = new Date(session.scheduledAt);
      const endTime = new Date(scheduledDate.getTime() + session.durationMinutes * 60000);
      
      if (endTime < now && session.isActive) {
        await db
          .update(liveSessions)
          .set({ 
            isActive: false,
            updatedAt: now 
          })
          .where(eq(liveSessions.id, session.id));
        
        session.isActive = false;
      }
    }

    return sendResponse(200, sessions, "Live sessions retrieved successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return sendResponse(500, null, errorMessage); 
  }
};