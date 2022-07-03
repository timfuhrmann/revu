import { NextApiRequest, NextApiResponse } from "next";
import { MISSING_PARAMETER, UNAUTHORIZED } from "../../../app/lib/error";
import { auth } from "../../../app/lib/firebase/admin";
import { COOKIE_SESSION, setCookie } from "../../../app/lib/api/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;

    if (!token) {
        res.status(400).json({ status: 400, code: MISSING_PARAMETER });
    }

    const expiresIn = 60 * 60 * 24 * 12 * 1000; // 12 days

    try {
        const sessionCookie = await auth.createSessionCookie(token, { expiresIn });

        const decodedClaims = await auth.verifySessionCookie(sessionCookie);

        const { uid, displayName, email, emailVerified, photoURL } = await auth.getUser(
            decodedClaims.uid
        );

        setCookie(res, COOKIE_SESSION, sessionCookie, { maxAge: expiresIn });

        const user: Auth.Session = {
            uid,
            displayName: displayName || null,
            email: email || null,
            emailVerified,
            photoURL: photoURL || null,
        };

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: 400, code: UNAUTHORIZED });
    }
}
