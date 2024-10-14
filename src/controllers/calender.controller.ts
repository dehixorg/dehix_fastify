import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, POST, GET } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import {
  createMeetLink,
  getGoogleAuthUrl,
} from "../common/services/calender.service";
import {
  createAuthUrlSchema,
  createMeetSchema,
} from "../schema/v1/calender/calender.create";

@Controller({ route: "/meeting" })
export default class CalendarController extends AuthController {
  // API to create a Google Calendar meeting with a Google Meet link
  @POST("/create-meeting", {
    schema: createMeetSchema,
  })
  async createMeeting(
    request: FastifyRequest<{ Body: { attendees: string[] } }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info("Creating a new Google Calendar meeting");

      const { attendees } = request.body;

      if (!attendees || attendees.length === 0) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: "At least one attendee is required",
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }

      // Create Google Calendar meeting link
      const meetLink = await createMeetLink(attendees);

      return reply.status(STATUS_CODES.SUCCESS).send({
        message: "Meeting scheduled successfully",
        meetLink,
      });
    } catch (error: any) {
      this.logger.error(
        "Error creating Google Calendar meeting",
        error.message,
      );
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // New API to get the Google OAuth authentication URL
  @GET("/auth-url", {
    schema: createAuthUrlSchema,
  })
  async getGoogleAuthUrl(
    request: FastifyRequest<{ Querystring: { redirectUri: string } }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info("Generating Google OAuth authentication URL");

      // Get redirectUri from query string
      const { redirectUri } = request.query;
      this.logger.info(`URL: ${redirectUri}`);
      if (!redirectUri) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: "Redirect URI is required",
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }

      // Generate the authentication URL with the redirect URI
      const authUrl = getGoogleAuthUrl(redirectUri);
      return reply.status(STATUS_CODES.SUCCESS).send({ url: authUrl });
    } catch (error: any) {
      this.logger.error("Error generating Google OAuth URL", error.message);
      return reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
