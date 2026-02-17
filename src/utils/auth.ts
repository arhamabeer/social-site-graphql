export function requireAuth(context: any) {
  if (!context?.email) throw new Error("Not authenticated");
}
