import React from "react";
import styled from "styled-components";

const TextareaWrapper = styled.div<{ $loading?: boolean }>`
    position: relative;

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

const TextareaField = styled.textarea`
    padding: 1rem 1.5rem;
    text-align: left;
    width: 100%;
    min-height: 10rem;
    background: none;
    background-color: ${p => p.theme.gray50};
    color: ${p => p.theme.gray900};
    border-radius: ${p => p.theme.radius};
    border: 0.1rem solid ${p => p.theme.gray200};
    resize: none;

    &::placeholder {
        color: ${p => p.theme.gray600};
    }
`;

interface TextareaProps {
    name: string;
    value: string;
    placeholder?: string;
    loading?: boolean;
    onInput: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
    name,
    value,
    placeholder,
    loading,
    onInput,
}) => {
    return (
        <TextareaWrapper $loading={loading}>
            <TextareaField
                name={name}
                value={value}
                placeholder={placeholder}
                onInput={e => onInput((e.target as HTMLTextAreaElement).value)}
            />
        </TextareaWrapper>
    );
};
