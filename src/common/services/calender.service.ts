import { google } from "googleapis";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// Configuration for Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI, // Redirect URI set in Google Cloud Console
);

// Google Calendar API instance
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// Scopes for the Google Calendar API
const scopes = ["https://www.googleapis.com/auth/calendar"];

// Function to generate the authentication URL
export const getGoogleAuthUrl = (): string => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

// Function to handle the OAuth2 callback and set credentials
export const handleAuthCallback = async (code: string): Promise<void> => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
};

// Function to create a Google Calendar event with a meet link
export const createMeetLink = async (attendees: string[]): Promise<string> => {
  try {
    const event = await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      conferenceDataVersion: 1,
      requestBody: {
        summary: "Meeting",
        description: "Meeting",
        start: {
          dateTime: dayjs().add(1, "day").toISOString(), // Start time: 1 day from now
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dayjs().add(1, "day").add(1, "hour").toISOString(), // End time: 1 hour after start
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: uuidv4(), // Unique request ID
            conferenceSolutionKey: {
              type: "hangoutsMeet", // Create a Google Meet link
            },
          },
        },
        attendees: attendees.map((email) => ({ email })), // List of attendee emails
      },
    });

    console.log("Meeting link: ", event.data.hangoutLink); // Log the meet link
    return event.data.hangoutLink; // Return the meet link
  } catch (error) {
    console.error("Error creating event: ", error);
    throw new Error("Error scheduling meeting");
  }
};
