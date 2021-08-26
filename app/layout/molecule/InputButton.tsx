import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { Input } from "../atom/Input";
import { Button } from "../atom/Button";

const InputForm = styled.form`
    display: flex;
`;

const InputWrapper = styled.div`
    flex: 1;
    margin-right: 1.5rem;
`;

interface InputButtonProps {
    name: string;
    placeholder: string;
    button: string;
    onSubmit: (value: string) => void;
    clearOnSubmit?: boolean;
    loading?: boolean;
}

export const InputButton: React.FC<InputButtonProps> = ({
    name,
    button,
    placeholder,
    onSubmit,
    clearOnSubmit,
    loading,
}) => {
    const [value, setValue] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(value);

        if (clearOnSubmit) {
            setValue("");
        }
    };

    return (
        <InputForm onSubmit={handleSubmit}>
            <InputWrapper>
                <Input
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onInput={setValue}
                    loading={loading}
                />
            </InputWrapper>
            <Button type="submit" disabled={!value}>
                {button}
            </Button>
        </InputForm>
    );
};
