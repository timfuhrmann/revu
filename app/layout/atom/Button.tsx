import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ButtonText } from "../../css/typography";
import { Spinner } from "./Spinner";

const ButtonWrapper = styled.button<{
    $isSecondary?: boolean;
    $isSmall?: boolean;
    $isTertiary?: boolean;
    $isAlert?: boolean;
}>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid ${p => (p.$isAlert ? p.theme.red400 : p.theme.primary)};
    border-color: ${p => p.$isSecondary && p.theme.gray600};
    border-color: ${p => p.$isTertiary && "transparent"};
    padding: ${p => (p.$isSmall ? "1rem 2rem" : "0 1.5rem")};
    border-radius: ${p => p.theme.radius};
    height: ${p => !p.$isSmall && p.theme.formHeight};
    background-color: ${p => (p.$isAlert ? p.theme.red400 : p.theme.primary)};
    background-color: ${p => (p.$isSecondary || p.$isTertiary) && "transparent"};
    color: ${p => (p.$isTertiary ? p.theme.primary : p.theme.white)};
    color: ${p => p.$isSecondary && p.theme.gray900};
    transition: 0.2s color, 0.2s background-color, 0.2s border-color;
    will-change: color, background-color, border-color;

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            color: ${p => (p.$isAlert ? p.theme.red400 : p.theme.primary)};
            border-color: ${p => p.$isSecondary && p.theme.primary};
            border-color: ${p => p.$isTertiary && p.theme.primary};
        }
    }

    &:disabled {
        pointer-events: none;
        color: ${p => p.theme.gray600};
        border-color: ${p => p.theme.gray300};
        background-color: transparent;
    }
`;

const ButtonInner = styled.div<{ $loading?: boolean }>`
    display: flex;
    align-items: center;
    opacity: ${p => p.$loading && 0};
`;

const SpinnerWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

interface ButtonProps {
    isSmall?: boolean;
    isTertiary?: boolean;
    isSecondary?: boolean;
    isAlert?: boolean;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    action?: string | (() => void);
}

export const Button: React.FC<ButtonProps> = ({
    type,
    action,
    isSmall,
    isSecondary,
    isTertiary,
    isAlert,
    disabled,
    loading,
    children,
}) => {
    return typeof action === "string" ? (
        <Link href={action} passHref>
            <ButtonWrapper
                as="a"
                $isSmall={isSmall}
                $isSecondary={isSecondary}
                $isTertiary={isTertiary}
                $isAlert={isAlert}
                disabled={disabled || loading}>
                <ButtonText>
                    <ButtonInner $loading={loading}>{children}</ButtonInner>
                </ButtonText>
                {loading && (
                    <SpinnerWrapper>
                        <Spinner />
                    </SpinnerWrapper>
                )}
            </ButtonWrapper>
        </Link>
    ) : (
        <ButtonWrapper
            type={type}
            onClick={action}
            $isSmall={isSmall}
            $isSecondary={isSecondary}
            $isTertiary={isTertiary}
            $isAlert={isAlert}
            disabled={disabled || loading}>
            <ButtonText>
                <ButtonInner $loading={loading}>{children}</ButtonInner>
            </ButtonText>
            {loading && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
        </ButtonWrapper>
    );
};
