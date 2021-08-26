import { createContext, useContext } from "react";

interface SessionData {
    session: Auth.Session | null;
    loading: boolean;
    handleSignUpWithCredentials: (
        email: string,
        password: string,
        displayName: string
    ) => Promise<any>;
    handleLoginWithCredentials: (email: string, password: string) => Promise<any>;
    handleLoginWithGoogle: () => Promise<any>;
    handleSignOut: () => void;
}

export const SessionContext = createContext<SessionData>({} as SessionData);

export const useSession = () => useContext(SessionContext);
