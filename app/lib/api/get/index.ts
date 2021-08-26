import { db } from "../../firebase";

export const getMember = async (uid: string): Promise<Auth.Session | null> => {
    const doc = await db.doc(`users/${uid}`).get();

    if (doc) {
        return doc.data() as Auth.Session;
    } else {
        return null;
    }
};
