import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_SESSION, destroyCookie } from "../../../app/lib/api/cookie";
import { auth } from "../../../app/lib/firebase/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sessionCookie = req.cookies[COOKIE_SESSION];

    destroyCookie(res, COOKIE_SESSION);

    const decodedClaims = await auth.verifySessionCookie(sessionCookie);
    await auth.revokeRefreshTokens(decodedClaims.sub);

    res.status(200).end();
}
