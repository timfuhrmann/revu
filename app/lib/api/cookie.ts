import { NextApiResponse } from "next";
import cookie, { CookieSerializeOptions } from "cookie";

export const COOKIE_SESSION = "auth.session";

const defaultOptions: CookieSerializeOptions = {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
};

export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: string,
    options: CookieSerializeOptions
) => {
    return res.setHeader(
        "Set-Cookie",
        cookie.serialize(name, value, {
            ...defaultOptions,
            ...options,
        })
    );
};

export const destroyCookie = (res: NextApiResponse, name: string) => {
    return res.setHeader(
        "Set-Cookie",
        cookie.serialize(name, "", {
            ...defaultOptions,
            expires: new Date(0),
        })
    );
};
