import React, { useState } from "react";
import styled from "styled-components";
import { H4, SmallText, ButtonText } from "../../css/typography";
import { Input } from "../atom/Input";
import { Modal } from "../atom/Modal";

const ModalTitle = styled(H4)`
    margin-bottom: 1rem;
`;

const ModalText = styled(SmallText)`
    margin-bottom: 1rem;
`;

const ModalContent = styled.div`
    padding: 4rem;
    text-align: center;
`;

const ModalButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 3rem 0;
    width: 100%;
    transition: background-color 0.1s;
    will-change: background-color;

    &:disabled {
        pointer-events: none;
        color: ${p => p.theme.gray600};
    }
`;

const CancelButton = styled(ModalButton)`
    border-right: 0.1rem solid ${p => p.theme.gray200};

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.gray200};
        }
    }
`;

const ConfirmButton = styled(ModalButton)`
    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.gray200};
        }
    }
`;

const ConfirmString = styled(SmallText)`
    color: ${p => p.theme.gray900};
    margin-bottom: 2rem;
`;

const ControlsWrapper = styled.div`
    display: flex;
    border-top: 0.1rem solid ${p => p.theme.gray200};
`;

interface ConfirmModalProps {
    title: string;
    desc?: string;
    confirmString?: string;
    onConfirm: () => void;
    onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title,
    desc,
    confirmString,
    onConfirm,
    onClose,
}) => {
    const [value, setValue] = useState<string>("");

    const handleConfirm = () => {
        if (confirmString && value !== confirmString) {
            return;
        }

        onConfirm();
    };

    return (
        <Modal onClose={onClose}>
            <ModalContent>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>
                    {desc} You will not be able to revoke this action.
                    {confirmString && " To proceed, enter the following:"}
                </ModalText>
                {confirmString && (
                    <>
                        <ConfirmString>{confirmString}</ConfirmString>
                        <Input
                            name="confirm"
                            placeholder={confirmString}
                            value={value}
                            onInput={setValue}
                        />
                    </>
                )}
            </ModalContent>
            <ControlsWrapper>
                <CancelButton type="button" onClick={onClose}>
                    <ButtonText>Cancel</ButtonText>
                </CancelButton>
                <ConfirmButton
                    type="button"
                    onClick={handleConfirm}
                    disabled={!!confirmString && value !== confirmString}>
                    <ButtonText>Confirm</ButtonText>
                </ConfirmButton>
            </ControlsWrapper>
        </Modal>
    );
};
