import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";
import { NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { AdminDAO } from "../dao/admin.dao";

@Service()
export class AdminsService extends BaseService {
  @Inject(AdminDAO)
  private AdminDAO!: AdminDAO;

  async create(body: any) {
    const admin: any = await this.AdminDAO.createAdmin(body);
    return admin;
  }

  async getAdminByEmail(email: string) {
    const data: any = await this.AdminDAO.getAdminbyemail(email);

    if (data.length === 0) {
      return null;
    }
    return data;
  }

  async deleteAdminById(admin_id: string) {
    this.logger.info(
      `AdminsService: deleteAdminById: Deleting Admin for AdminId:${admin_id}`,
    );

    const checkAdmin = await this.AdminDAO.findAdminById(admin_id);
    if (!checkAdmin) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      );
    }
    const deleteAdmin = await this.AdminDAO.deleteAdminById(admin_id);

    return deleteAdmin;
  }

  async getAllAdmins() {
    this.logger.info("AdminsService: getAllAdmins: Fetching All Admins ");

    const admins: any = await this.AdminDAO.getAllAdmins();

    if (!admins) {
      this.logger.error("AdminsService: getAllAdmins: Admin not found ");
      throw new NotFoundError(
        RESPONSE_MESSAGE.NOT_FOUND("Admin"),
        ERROR_CODES.ADMIN_NOT_FOUND,
      );
    }

    return admins;
  }

  async getAdminById(admin_id: string) {
    this.logger.info(
      `AdminsService: getAdminById: Fetching Admin for Admin ID:${admin_id}`,
    );

    const admin: any = await this.AdminDAO.findAdminById(admin_id);
    if (!admin) {
      throw new NotFoundError(
        RESPONSE_MESSAGE.DATA_NOT_FOUND,
        ERROR_CODES.ADMIN_NOT_FOUND,
      );
    }

    return admin;
  }
}
