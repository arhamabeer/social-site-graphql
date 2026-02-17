import { randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db.js";
import { hashGenerator } from "../utils/hasher.js";
import { jwtSign } from "../utils/jwt.js";

export interface CreateUserPayload {
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  profileImageUrl: string | null;
}

export class UserService {
  public static async getCurrentLoggedInUser(email: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) throw "User not found";
    return user;
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password, profileImageUrl } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = hashGenerator(salt, password);

    const res = prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
        profileImageUrl,
      },
    });
    return res;
  }

  public static async userLogin(email: string, password: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) throw "User not found";

    const hashedPassword = hashGenerator(user.salt, password);
    if (user.password !== hashedPassword) throw "Invalid password";

    return jwtSign({ email: user.email, id: user.id });
  }
}
