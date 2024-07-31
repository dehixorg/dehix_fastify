import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import {
  FAQ_ALL_ENDPOINT,
  FAQ_DELETE_BY_ID_ENDPOINT,
  FAQ_ENDPOINT,
  FAQ_ID_ENDPOINT,
} from "../constants/faq.constant";
import { FaqService } from "../services";
import { createFaqSchema } from "../schema/v1/faq/create";
import { createFaqBody } from "../types/v1/faq/create";
import { DeleteFaqPathParams } from "../types/v1/faq/delete";
import { deleteFaqSchema } from "../schema/v1/faq/delete";
import { getAllFaqSchema } from "../schema/v1/faq/get";

@Controller({ route: FAQ_ENDPOINT })
export default class FaqController extends AuthController {
  @Inject(FaqService)
  faqService!: FaqService;

  @POST(FAQ_ID_ENDPOINT, { schema: createFaqSchema })
  async createFaq(
    request: FastifyRequest<{ Body: createFaqBody }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`FaqController  -> createFaq -> create FAQ}`);
      const data = await this.faqService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in CreateFaq: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @DELETE(FAQ_DELETE_BY_ID_ENDPOINT, { schema: deleteFaqSchema })
  async deleteFaqById(
    request: FastifyRequest<{ Params: DeleteFaqPathParams }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `FaqController -> deleteFaqById -> Deleting FAQ using: ${request.params.faq_id}`,
      );
      await this.faqService.deleteFaqById(request.params.faq_id);

      reply.status(STATUS_CODES.SUCCESS).send({ message: "Faq deleted" });
    } catch (error: any) {
      this.logger.error(`Error in delete faq: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Faq"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(FAQ_ALL_ENDPOINT, { schema: getAllFaqSchema })
  async getAllFaqs(request: FastifyRequest, reply: FastifyReply) {
    try {
      this.logger.info(`faqController -> getAllFaqs -> Fetching Faqs`);

      const data = await this.faqService.getAllFaqs();

      console.log("DATA:", data);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllFaqs: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Faq not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Faq"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
