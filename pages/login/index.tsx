import React, { useState } from "react";
import styled from "styled-components";
import { ButtonText } from "../../app/css/typography";
import { GetServerSideProps } from "next";
import { CredentialsForm } from "../../app/layout/organism/CredentialsForm";
import { Input } from "../../app/layout/atom/Input";
import { getSession } from "../../app/lib/api";
import { useSession } from "../../app/context/user/SessionContext";
import { Meta } from "../../app/lib/meta";
import { PasswordModal } from "../../app/layout/molecule/PasswordModal";
import { useRouter } from "next/router";
import { LoginData, LoginForm } from "../../app/layout/organism/LoginForm";

const LoginWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: calc(100vh - 7.5vh);
    min-height: 60rem;
`;

const LoginInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const FormWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 35rem;
`;

const Login: React.FC = () => {
    const router = useRouter();
    const { handleLoginWithCredentials } = useSession();
    const [error, setError] = useState<string>("");

    const toggleForgotPassword = () => {
        router.push({ query: { ...router.query, modal: "password" } }, router.asPath, {
            shallow: true,
        });
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

    return (
        <LoginWrapper>
            <Meta title="Login - Revu" />
            <LoginInner>
                <FormWrapper>
                    <LoginForm
                        error={error}
                        onSubmit={handleSubmit}
                        onForgotPassword={toggleForgotPassword}
                    />
                </FormWrapper>
            </LoginInner>
            <PasswordModal />
        </LoginWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession(req);

    if (session) {
        return {
            redirect: {
                destination: "/teams",
                permanent: false,
            },
        };
    }

    return {
        props: { isLandingPage: true },
    };
};

export default Login;
