import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { H2 } from "../../css/typography";
import { ProviderButtons } from "../molecule/ProviderButtons";
import { Button } from "../atom/Button";

const FormWrapper = styled.form``;

const InputWrapper = styled.div`
    width: 100%;
`;

const FormHeadline = styled(H2)`
    margin-bottom: 2rem;
`;

const FormControls = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 3rem;
`;

const SubmitButton = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
`;

const ErrorWrapper = styled.div`
    margin-top: 1rem;
    color: ${p => p.theme.red400};
`;

interface CredentialsFormProps {
    title: string;
    button: string;
    onSubmit: () => void;
    error?: string;
}

export const CredentialsForm: React.FC<CredentialsFormProps> = ({
    title,
    button,
    error,
    onSubmit,
    children,
}) => {
    const [formError, setFormError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!error) {
            return;
        }

        setLoading(false);
        setFormError(error);
    }, [error]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormError("");
        onSubmit();
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormHeadline>{title}</FormHeadline>
            <InputWrapper>{children}</InputWrapper>
            {formError && <ErrorWrapper>{formError}</ErrorWrapper>}
            <FormControls>
                <SubmitButton>
                    <Button type="submit" loading={loading}>
                        {button}
                    </Button>
                </SubmitButton>
                <ProviderButtons onError={setFormError} />
            </FormControls>
        </FormWrapper>
    );
};
