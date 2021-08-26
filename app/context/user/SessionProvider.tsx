import React, { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { useRouter } from "next/router";
import { getSession } from "../../lib/api";
import { signOut } from "../../lib/api/auth";
import { signInWithGoogle } from "../../lib/api/auth/google";
import { signInWithTwitch } from "../../lib/api/auth/twitch";
import {
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
} from "../../lib/api/auth/credentials";

export const SessionProvider: React.FC = ({ children }) => {
    const router = useRouter();
    const { t } = router.query;
    const [session, setSession] = useState<Auth.Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getSession().then(res => {
            if (res) {
                setSession(res.user);
            }

            setLoading(false);
        });
    }, []);

    useEffect(() => {
        handleLoginWithTwitch();
    }, [t]);

    const handleSignUpWithCredentials = async (
        email: string,
        password: string,
        displayName: string
    ) => {
        const [user, error] = await signUpWithEmailAndPassword(email, password, displayName);

        if (user && !error) {
            setSession(user);
            return router.replace("/teams");
        }

        return error;
    };

    const handleLoginWithCredentials = async (email: string, password: string) => {
        const [user, error] = await signInWithEmailAndPassword(email, password);

        if (user && !error) {
            setSession(user);
            return router.replace("/teams");
        }

        return error;
    };

    const handleLoginWithGoogle = async () => {
        const [user, error] = await signInWithGoogle();

        if (user && !error) {
            setSession(user);
            return router.replace("/teams");
        }

        return error;
    };

    const handleLoginWithTwitch = async () => {
        if (!t || typeof t !== "string") {
            return;
        }

        const [user, error] = await signInWithTwitch(t);

        if (user && !error) {
            setSession(user);
            return router.replace(router.pathname);
        }

        router.replace("/login");
    };
    const handleSignOut = async () => {
        await signOut();
        return router.replace("/");
    };

    return (
        <SessionContext.Provider
            value={{
                session,
                loading,
                handleSignUpWithCredentials,
                handleLoginWithCredentials,
                handleLoginWithGoogle,
                handleSignOut,
            }}>
            {children}
        </SessionContext.Provider>
    );
};
