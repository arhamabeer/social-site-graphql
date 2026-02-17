import { jwtDecode } from "../utils/jwt.js";

export function requireAuth(context: any) {
  if (!context?.email) throw new Error("Not authenticated");
}
export function tokenCheck(token: string) {
  let user = null;
  if (token) user = jwtDecode(token);
  return user;
}
