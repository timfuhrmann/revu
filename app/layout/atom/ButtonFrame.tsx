import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ButtonWrapper = styled.button<{ $active?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${p => p.theme.formHeight};
    padding: 0 1rem;
    color: ${p => (p.$active ? p.theme.gray900 : p.theme.gray600)};
    border: 0.1rem solid ${p => (p.$active ? p.theme.gray600 : p.theme.gray200)};
    border-radius: ${p => p.theme.radius};
    transition: 0.1s color, 0.1s border-color;
    will-change: color, border-color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
            border-color: ${p => p.theme.gray900};
        }
    }
`;

interface ButtonFrameProps {
    action: string | (() => void);
    active?: boolean;
    title?: string;
}

export const ButtonFrame: React.FC<ButtonFrameProps> = ({ action, title, active, children }) => {
    return typeof action === "string" ? (
        <Link href={action} passHref>
            <ButtonWrapper as="a" title={title} $active={active}>
                {children}
            </ButtonWrapper>
        </Link>
    ) : (
        <ButtonWrapper type="button" onClick={action} title={title} $active={active}>
            {children}
        </ButtonWrapper>
    );
};
