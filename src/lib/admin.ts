/** HTTP Basic Auth check for the requests admin page. User: "admin", password: ADMIN_PASSWORD. */
export const adminEnabled = () => !!process.env.ADMIN_PASSWORD;

export function isAdminAuth(authorization: string | null | undefined): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || !authorization?.startsWith("Basic ")) return false;
  try {
    const [user, ...rest] = atob(authorization.slice(6)).split(":");
    return user === "admin" && rest.join(":") === pw;
  } catch {
    return false;
  }
}
