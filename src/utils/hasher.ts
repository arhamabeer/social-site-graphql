import { createHmac, randomBytes } from "node:crypto";

export function hashGenerator(salt: string, password: string) {
  return createHmac("sha256", salt).update(password).digest("hex");
}
