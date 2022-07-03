import { auth, db } from "../../firebase";
import { errors, UNKNOWN_ERROR } from "../../error";
import { sessionLogin } from "../index";

export const signInWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<Auth.Response> => {
    try {
        const { user } = await auth().signInWithEmailAndPassword(email, password);

        if (!user) {
            return [null, errors[UNKNOWN_ERROR]];
        }

        const token = await user.getIdToken();

        const { user: newUser } = await sessionLogin(token);

        return [newUser, null];
    } catch (error) {
        return [null, error];
    }
};

export const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
): Promise<Auth.Response> => {
    try {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);

        if (!user) {
            return [null, errors[UNKNOWN_ERROR]];
        }

        const token = await user.getIdToken();

        const { user: newUser } = await sessionLogin(token);

        await user.updateProfile({ displayName });

        const userDoc = db.collection("users").doc(user.uid);
        await userDoc.set({ ...newUser, displayName });

        return [newUser, null];
    } catch (error) {
        return [null, error];
    }
};
