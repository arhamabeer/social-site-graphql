import { prismaClient } from "../lib/db.js";

export class Health {
  public static async healthCheck() {
    try {
      await prismaClient.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      throw new Error("Unhealthy");
    }
  }
}
