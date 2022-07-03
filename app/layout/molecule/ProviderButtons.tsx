import React, { useState } from "react";
import { Button } from "../atom/Button";
import styled from "styled-components";
import { Google } from "../../icon/Google";
import { Twitch } from "../../icon/Twitch";
import { errors, UNKNOWN_ERROR } from "../../lib/error";
import { useSession } from "../../context/user/SessionContext";

const ButtonsWrapper = styled.div``;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;

    &:first-child {
        margin: 0;
    }
`;

const IconGoogle = styled(Google)`
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
`;

const IconTwitch = styled(Twitch)`
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
`;

interface ProviderButtonsProps {
    onError: (message: string) => void;
}

export const ProviderButtons: React.FC<ProviderButtonsProps> = ({ onError }) => {
    const { handleLoginWithGoogle } = useSession();
    const [loading, setLoading] = useState<"google" | "twitch" | null>(null);

    const handleSignIn = async (provider: "google" | "twitch") => {
        setLoading(provider);
        let firebaseError;

        switch (provider) {
            case "google":
                firebaseError = await handleLoginWithGoogle();
                break;
            case "twitch":
                window.location.href = process.env.NEXT_PUBLIC_APP_URL + "/api/auth/twitch";
                return;
        }

        if (firebaseError) {
            setLoading(null);
            onError(errors[UNKNOWN_ERROR]);
        }
    };

    return (
        <ButtonsWrapper>
            <ButtonWrapper>
                <Button
                    type="button"
                    action={() => handleSignIn("google")}
                    loading={loading === "google"}
                    isSecondary>
                    <IconGoogle />
                    Login with Google
                </Button>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button
                    type="button"
                    action={() => handleSignIn("twitch")}
                    loading={loading === "twitch"}
                    isSecondary>
                    <IconTwitch />
                    Login with Twitch
                </Button>
            </ButtonWrapper>
        </ButtonsWrapper>
    );
};
