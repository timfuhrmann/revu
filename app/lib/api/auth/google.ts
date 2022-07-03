import { auth, db } from "../../firebase";
import { errors, UNKNOWN_ERROR } from "../../error";
import { sessionLogin } from "../index";

const googleAuthProvider = new auth.GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<Auth.Response> => {
    try {
        const { user } = await auth().signInWithPopup(googleAuthProvider);

        if (!user) {
            return [null, errors[UNKNOWN_ERROR]];
        }

        const token = await user.getIdToken();

        const { user: newUser } = await sessionLogin(token);

        const userDoc = db.collection("users").doc(user.uid);
        await userDoc.set(newUser);

        return [newUser, null];
    } catch (error) {
        return [null, error];
    }
};
