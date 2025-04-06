import { NODE_ENV } from "../config/environment.ts";

export const getTokenCookieConfig = (
    maxAge: number
): { httpOnly: boolean; secure: boolean; maxAge: number; sameSite: "lax" } => ({
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge,
    sameSite: "lax",
});
