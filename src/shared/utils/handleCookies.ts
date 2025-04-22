import { NODE_ENV } from "../config/environment";

type CookieConfig = {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    sameSite: "lax" | "strict" | "none";
};

export const getTokenCookieConfig = (maxAge: number): CookieConfig => ({
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge,
    sameSite: "lax",
});
