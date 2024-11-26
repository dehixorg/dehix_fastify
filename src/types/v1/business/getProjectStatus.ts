import { StatusEnum } from "src/models/project.entity";

export interface GetBusinessProjectQueryParams {
  status?: StatusEnum;
}
