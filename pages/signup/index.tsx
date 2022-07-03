import React, { useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { CredentialsForm } from "../../app/layout/organism/CredentialsForm";
import { Input } from "../../app/layout/atom/Input";
import { getSession } from "../../app/lib/api";
import { useSession } from "../../app/context/user/SessionContext";
import { Meta } from "../../app/lib/meta";

const SignUpWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: calc(100vh - 7.5vh);
    min-height: 60rem;
`;

const SignUpInner = styled.div`
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

const InputWrapper = styled.div`
    margin-bottom: 1rem;

    &:last-child {
        margin: 0;
    }
`;

interface SignUpData {
    displayName: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const { handleSignUpWithCredentials } = useSession();
    const [error, setError] = useState<string>("");
    const [form, setForm] = useState<SignUpData>({
        displayName: "",
        email: "",
        password: "",
    });

    const handleInput = (selector: keyof SignUpData, value: string) => {
        setForm(prevState => {
            return {
                ...prevState,
                [selector]: value,
            };
        });
    };

    const handleSubmit = async () => {
        setError("");

        const { email, password, displayName } = form;

        if (!email || !password || !displayName) {
            return;
        }

        const firebaseError = await handleSignUpWithCredentials(email, password, displayName);

        if (firebaseError) {
            setError(firebaseError.message);
        }
    };

    return (
        <SignUpWrapper>
            <Meta title="Sign Up - Revu" />
            <SignUpInner>
                <FormWrapper>
                    <CredentialsForm
                        title="Sign up for Revu"
                        button="Sign up"
                        error={error}
                        onSubmit={handleSubmit}>
                        <InputWrapper>
                            <Input
                                type="text"
                                name="displayName"
                                value={form.displayName}
                                placeholder="Name"
                                onInput={value => handleInput("displayName", value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                type="text"
                                name="email"
                                value={form.email}
                                placeholder="E-Mail"
                                onInput={value => handleInput("email", value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Input
                                type="password"
                                name="password"
                                value={form.password}
                                placeholder="Password"
                                onInput={value => handleInput("password", value)}
                            />
                        </InputWrapper>
                    </CredentialsForm>
                </FormWrapper>
            </SignUpInner>
        </SignUpWrapper>
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

export default SignUp;
