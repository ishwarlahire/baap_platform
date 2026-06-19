import { FastifyInstance } from "fastify";
import * as controller from "../controllers/designRecord.controller";

export default async function (
  app: FastifyInstance
) {

  app.post(
    "/createDesignRecord",
    controller.createDesignRecord
  );

  app.get(
    "/getAllDesignRecords",
    controller.getDesignRecords
  );

  app.put(
    "/updateDesignRecord/:id",
    controller.updateDesignRecord
  );

  app.delete(
    "/deleteDesignRecord/:id",
    controller.deleteDesignRecord
  );
}