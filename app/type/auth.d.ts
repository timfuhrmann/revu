declare module Auth {
    type Response = [Auth.Session | null, any | null];

    interface Session {
        uid: string;
        displayName: string | null;
        email: string | null;
        emailVerified: boolean;
        photoURL: string | null;
    }
}
