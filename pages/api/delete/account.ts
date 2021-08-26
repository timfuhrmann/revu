import { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../../app/lib/firebase/admin";
import { COOKIE_SESSION, destroyCookie } from "../../../app/lib/api/cookie";
import { UNAUTHORIZED } from "../../../app/lib/config/errors";
import { removeFromObjectByKey } from "../../../app/lib/util";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sessionCookie = req.cookies[COOKIE_SESSION];

    if (!sessionCookie) {
        return res.status(400).json({ status: 400, code: UNAUTHORIZED });
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie);

        await auth.revokeRefreshTokens(decodedClaims.sub);

        destroyCookie(res, COOKIE_SESSION);

        const user = db.doc(`users/${decodedClaims.uid}`);
        const teams = db.collection("teams").where(`roles.${decodedClaims.uid}`, ">", -1);

        await db.runTransaction(async tx => {
            const teamRefs = await tx.get(teams);

            const transactions = teamRefs.docs.map(teamDoc => {
                const team = teamDoc.data() as Data.Team;

                return tx.update(teamDoc.ref, {
                    roles: removeFromObjectByKey(team.roles, decodedClaims.uid),
                });
            });

            await Promise.all(transactions);

            return tx.delete(user);
        });

        await auth.deleteUser(decodedClaims.uid);

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json(error);
    }
}
