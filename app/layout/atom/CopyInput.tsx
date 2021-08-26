import React from "react";
import styled from "styled-components";
import { InputText } from "../../css/typography";
import { Clipboard } from "../../icon/Clipboard";

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
    border: 0.1rem solid ${p => p.theme.gray200};
    padding: 0 4rem 0 1.5rem;
    height: ${p => p.theme.formHeight};
    border-radius: ${p => p.theme.radius};

    &::placeholder {
        color: ${p => p.theme.gray600};
    }
`;

const CopyButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 4rem;
    color: ${p => p.theme.gray600};
    transition: color 0.1s;
    will-change: color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const IconCopy = styled(Clipboard)`
    width: 2rem;
    height: 2rem;
`;

interface CopyInputProps {
    name: string;
    value: string;
}

export const CopyInput: React.FC<CopyInputProps> = ({ value, name }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <InputWrapper $loading={!value}>
            <InputText>
                <InputField name={name} value={value} readOnly />
            </InputText>
            <CopyButton onClick={handleCopy}>
                <IconCopy />
            </CopyButton>
        </InputWrapper>
    );
};
