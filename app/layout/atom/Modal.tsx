import React, { useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 6;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: fade-in 0.1s ease forwards;

    @keyframes fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const ModalOverlay = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.gray900};
    opacity: 0.25;
`;

const ModalFrame = styled.div`
    position: relative;
    z-index: 1;
    width: 50rem;
    max-width: calc(100vw - 4rem);
    background-color: ${p => p.theme.gray50};
    border-radius: ${p => p.theme.radius};
    overflow: hidden;
    transform: translateZ(0);
`;

interface ModalProps {
    onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    return (
        <ModalWrapper>
            <ModalFrame>{children}</ModalFrame>
            <ModalOverlay type="button" as={onClose ? "div" : undefined} onClick={onClose} />
        </ModalWrapper>
    );
};
