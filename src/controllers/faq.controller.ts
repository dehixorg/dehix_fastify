import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, Inject, POST } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { AuthController } from "../common/auth.controller";
import { FAQ_ENDPOINT } from "src/constants/faq.constant";
import { FaqService } from "src/services";

@Controller({ route: FAQ_ENDPOINT })
export default class FaqController extends AuthController {
    @Inject(FaqService)
    faqService!: FaqService;


}
