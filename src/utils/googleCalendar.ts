import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export const getGoogleOAuthClient = (): OAuth2Client => {
  return new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/google`
  );
};

export const getAdminCalendarClient = async () => {
  const oauth2Client = getGoogleOAuthClient();

  if (!process.env.ADMIN_GOOGLE_REFRESH_TOKEN) {
    throw new Error('Admin refresh token not configured');
  }

  oauth2Client.setCredentials({
    refresh_token: process.env.ADMIN_GOOGLE_REFRESH_TOKEN,
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
};

export const createGoogleMeetLink = async (
  title: string,
  description: string,
  scheduledAt: Date,
  durationMinutes: number
) => {
  const calendar = await getAdminCalendarClient();
  const endTime = new Date(scheduledAt.getTime() + durationMinutes * 60000);

  const event = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: title,
      description,
      start: { dateTime: scheduledAt.toISOString(), timeZone: 'UTC' },
      end: { dateTime: endTime.toISOString(), timeZone: 'UTC' },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  });

  const meetLink = event.data.conferenceData?.entryPoints?.find(
    (entry) => entry.entryPointType === 'video'
  )?.uri;

  if (!meetLink) throw new Error('Failed to create Google Meet link');

  return meetLink;
};