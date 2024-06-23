import { Service } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { UnAuthorisedError } from "../common/errors";
import { RESPONSE_MESSAGE } from "../common/constants";

@Service()
export class RolesService extends BaseService {
  // No entry of routes means, allowed
  permissionMap = {
    "/v1/checkout-session": {
      write: ["VENDOR_OWNER"], // only admin can write [Post/put]
      delete: [], // blank means, no roles can delete
      read: [], // blank means, no roles can read
    },
  };

  constructRoleType(decodedToken) {
    const { userType, role } = decodedToken;

    let roleType = userType;

    if (role) {
      roleType += `_${role}`;
    }

    return roleType;
  }

  validatePermission(decodedToken: any) {
    const route = this.request.url;

    const roleType = this.constructRoleType(decodedToken);

    console.log("validatePermission -> roleType", roleType);

    if (!roleType) {
      throw new UnAuthorisedError(
        `Role: ${roleType} is not authorised to perform this request.`,
        RESPONSE_MESSAGE.UNAUTHORISED,
      );
    }

    let notAuthorized = false;

    for (const key in this.permissionMap) {
      if (route.includes(key)) {
        // its a match
        const readPerm = this.permissionMap[key].read || ["*"];
        const writePerm = this.permissionMap[key].write || ["*"];
        const deletePerm = this.permissionMap[key].delete || ["*"];

        if (this.request.method === "GET") {
          notAuthorized =
            readPerm.indexOf("*") == -1 && readPerm.indexOf(roleType) == -1;
        } else if (this.request.method === "DELETE") {
          notAuthorized =
            deletePerm.indexOf("*") == -1 && deletePerm.indexOf(roleType) == -1;
        } else if (
          this.request.method === "POST" ||
          this.request.method === "PUT"
        ) {
          notAuthorized =
            writePerm.indexOf("*") == -1 && writePerm.indexOf(roleType) == -1;
        }
      }
    }

    if (notAuthorized) {
      throw new UnAuthorisedError(
        `Role: ${roleType} is not authorised to perform this request.`,
        RESPONSE_MESSAGE.UNAUTHORISED,
      );
    }
  }
}
