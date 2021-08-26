import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_SESSION } from "../../../app/lib/api/cookie";
import { UNAUTHORIZED } from "../../../app/lib/config/errors";
import { auth } from "../../../app/lib/firebase/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sessionCookie = req.cookies[COOKIE_SESSION];

    if (!sessionCookie) {
        return res.status(201).json({ status: 201, code: UNAUTHORIZED });
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie);

        const { uid, displayName, email, emailVerified, photoURL } = await auth.getUser(
            decodedClaims.uid
        );

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
        res.status(201).json({ status: 201, code: UNAUTHORIZED });
    }
}
