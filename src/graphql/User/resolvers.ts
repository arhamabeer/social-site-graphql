import { UserService, type CreateUserPayload } from "../../services/user.js";

const queries = {
  userLogin: async (
    _: any,
    { email, password }: { email: string; password: string },
    context: any,
  ) => {
    const res = await UserService.userLogin(email, password);
    console.log(context);
    return res;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res?.id;
  },
};

export const resolvers = { queries, mutations };
