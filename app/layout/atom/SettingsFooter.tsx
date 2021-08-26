import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const FooterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem 2rem;
    background-color: ${p => p.theme.gray100};

    @media ${p => p.theme.bp.l} {
        padding: 1.5rem 3rem;
    }
`;

interface SettingsFooterProps {
    button: string;
    type?: "button" | "submit" | "reset";
    isSecondary?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
    button,
    disabled,
    isSecondary,
    type,
    onClick,
}) => {
    return (
        <FooterWrapper>
            <Button type={type} action={onClick} disabled={disabled} isAlert={isSecondary} isSmall>
                {button}
            </Button>
        </FooterWrapper>
    );
};
