import { UserService, type CreateUserPayload } from "../../services/user.js";
import { requireAuth } from "../../utils/auth.js";

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
  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    requireAuth(context);
    const _userRes = await UserService.getCurrentLoggedInUser(context.email);
    return _userRes;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res?.id;
  },
};

export const resolvers = { queries, mutations };
