import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "../atom/Modal";
import { useRouter } from "next/router";
import { useSession } from "../../context/user/SessionContext";
import { LoginData, LoginForm } from "./LoginForm";

const ModalInner = styled.div`
    padding: 4rem;
`;

export const LoginModal: React.FC = () => {
    const router = useRouter();
    const { t } = router.query;
    const { session, loading, handleLoginWithCredentials } = useSession();
    const [error, setError] = useState<string>("");

    const toggleForgotPassword = () => {
        router.replace(
            { pathname: "/login", query: { ...router.query, modal: "password" } },
            router.asPath,
            {
                shallow: true,
            }
        );
    };

    const handleSubmit = async (form: LoginData) => {
        setError("");

        const { email, password } = form;

        if (!email || !password) {
            return;
        }

        const firebaseError = await handleLoginWithCredentials(form.email, form.password);

        if (firebaseError) {
            setError(firebaseError.message);
        }
    };

    if (session || loading || (t && typeof t === "string")) return null;

    return (
        <Modal onClose={() => null}>
            <ModalInner>
                <LoginForm
                    error={error}
                    onSubmit={handleSubmit}
                    onForgotPassword={toggleForgotPassword}
                />
            </ModalInner>
        </Modal>
    );
};
