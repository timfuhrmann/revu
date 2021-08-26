import React from "react";
import styled from "styled-components";
import { H4, SmallText, ButtonText } from "../../css/typography";
import { CopyInput } from "../atom/CopyInput";
import { Modal } from "../atom/Modal";

const ModalTitle = styled(H4)`
    margin-bottom: 1rem;
`;

const ModalText = styled(SmallText)`
    margin-bottom: 2rem;
`;

const ModalContent = styled.div`
    padding: 4rem;
    text-align: center;
`;

const ModalButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 3rem 0;
    border-top: 0.1rem solid ${p => p.theme.gray200};
    width: 100%;
    transition: background-color 0.1s;
    will-change: background-color;

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.gray200};
        }
    }
`;

interface CopyPopUpProps {
    title: string;
    desc: string;
    value: string;
    onClose: () => void;
}

export const CopyModal: React.FC<CopyPopUpProps> = ({ title, desc, value, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <ModalContent>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>{desc}</ModalText>
                <CopyInput name="Invite Link" value={value} />
            </ModalContent>
            <ModalButton type="button" onClick={onClose}>
                <ButtonText>Ok</ButtonText>
            </ModalButton>
        </Modal>
    );
};
