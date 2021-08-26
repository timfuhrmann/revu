import React from "react";
import styled from "styled-components";
import { InputText } from "../../css/typography";

const InputWrapper = styled.div<{ $loading?: boolean }>`
    position: relative;
    width: 100%;

    &::after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        display: ${p => (p.$loading ? "block" : "none")};
        width: 100%;
        height: 100%;
        background-color: ${p => p.theme.gray300};
        border-radius: ${p => p.theme.radius};
    }
`;

const InputField = styled.input`
    text-align: left;
    width: 100%;
    background-color: ${p => p.theme.gray50};
    color: ${p => p.theme.gray900};
    border: 0.1rem solid ${p => p.theme.gray300};
    padding: 0 1.5rem;
    height: ${p => p.theme.formHeight};
    border-radius: ${p => p.theme.radius};

    &::placeholder {
        color: ${p => p.theme.gray600};
    }
`;

interface InputProps {
    name: string;
    value: string;
    onInput: (value: string) => void;
    type?: string;
    placeholder?: string;
    loading?: boolean;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
    name,
    placeholder,
    value,
    type,
    loading,
    disabled,
    onInput,
}) => {
    return (
        <InputWrapper $loading={loading}>
            <InputText>
                <InputField
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onInput={e => onInput((e.target as HTMLInputElement).value)}
                    readOnly={disabled}
                />
            </InputText>
        </InputWrapper>
    );
};
