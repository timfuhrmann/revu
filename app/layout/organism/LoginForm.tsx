import React, { useState } from "react";
import { Input } from "../atom/Input";
import { ButtonText } from "../../css/typography";
import { CredentialsForm } from "./CredentialsForm";
import styled from "styled-components";

const ForgotPasswordWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ForgotPasswordButton = styled.button`
    color: ${p => p.theme.gray600};
    transition: color 0.1s;
    will-change: color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const InputWrapper = styled.div`
    margin-bottom: 1rem;

    &:last-child {
        margin: 0;
    }
`;

export interface LoginData {
    email: string;
    password: string;
}

interface LoginFormProps {
    error: string;
    onSubmit: (form: LoginData) => void;
    onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ error, onSubmit, onForgotPassword }) => {
    const [form, setForm] = useState<LoginData>({
        email: "",
        password: "",
    });

    const handleInput = (selector: keyof LoginData, value: string) => {
        setForm(prevState => {
            return {
                ...prevState,
                [selector]: value,
            };
        });
    };

    return (
        <CredentialsForm
            title="Login to Revu"
            button="Login"
            error={error}
            onSubmit={() => onSubmit(form)}>
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
            <InputWrapper>
                <ForgotPasswordWrapper>
                    <ForgotPasswordButton type="button" onClick={onForgotPassword}>
                        <ButtonText>Forgot password?</ButtonText>
                    </ForgotPasswordButton>
                </ForgotPasswordWrapper>
            </InputWrapper>
        </CredentialsForm>
    );
};
