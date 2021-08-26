import { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../../app/lib/firebase/admin";

const users = db.collection("users");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid, displayName, email, emailVerified, photoURL } = req.body;

    if (!uid) {
        return res.status(500).end();
    }

    const authUser = { displayName, email, emailVerified, photoURL };

    try {
        await auth.updateUser(uid, authUser).catch(error => {
            if (error.code === "auth/user-not-found") {
                return auth.createUser({ ...authUser, uid });
            }

            throw error;
        });

        const user: Auth.Session = {
            uid,
            displayName,
            email,
            emailVerified,
            photoURL,
        };

        const userRef = users.doc(uid);
        await userRef.set(user);

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json(error);
    }
}
