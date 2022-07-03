import { auth } from "../../firebase";
import { errors, UNKNOWN_ERROR } from "../../error";
import { sessionLogin } from "../index";

export const signInWithTwitch = async (token: string): Promise<Auth.Response> => {
    try {
        const { user } = await auth().signInWithCustomToken(token);

        if (!user) {
            return [null, errors[UNKNOWN_ERROR]];
        }

        const idToken = await user.getIdToken();

        const { user: newUser } = await sessionLogin(idToken);

        return [newUser, null];
    } catch (error) {
        return [null, error];
    }
};
