import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = `sajdkn3jk2bn4nSJdfuiojJFUIO$EWJ0FJEWFJ09jduiofj09w&ejfiods*jf09j1-ioje08fjsdiojfJUINEF8JD-0`;

export interface CreateUserPayload {
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  profileImageUrl: string | null;
}

export class UserService {
  private static hashGenerator(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static async getCurrentLoggedInUser(email: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) throw "User not found";
    return user;
  }

  public static jwtDecode(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password, profileImageUrl } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = this.hashGenerator(salt, password);

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

    const hashedPassword = this.hashGenerator(user.salt, password);
    if (user.password !== hashedPassword) throw "Invalid password";

    return jwt.sign({ email: user.email, id: user.id }, JWT_SECRET);
  }
}
