import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { H4, InputText, SmallText } from "../../css/typography";
import { Modal } from "../atom/Modal";
import { useRouter } from "next/router";
import { Button } from "../atom/Button";
import { createFeedback } from "../../lib/api/create";
import { useSession } from "../../context/user/SessionContext";
import { Textarea } from "../atom/Textarea";
import { Input } from "../atom/Input";

const ModalTitle = styled(H4)`
    margin-bottom: 0.5rem;
    text-align: center;
`;

const ModalDesc = styled(SmallText)`
    margin-bottom: 2rem;
    text-align: center;
`;

const ModalContent = styled.form`
    padding: 4rem;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
`;

export const PasswordModal: React.FC = () => {
    const router = useRouter();
    const { modal } = router.query;
    const [email, setEmail] = useState<string>("");

    const onClose = () => {
        router.push({ query: { ...router.query, modal: undefined } }, router.asPath, {
            shallow: true,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email) {
            return;
        }

        onClose();
    };

    if (modal !== "password") return null;

    return (
        <Modal onClose={onClose}>
            <ModalContent onSubmit={onSubmit}>
                <ModalTitle>Reset Password</ModalTitle>
                <ModalDesc>
                    Please enter your email to reset your password. Please follow the instructions
                    you will receive via email.
                </ModalDesc>
                <Input name="email" placeholder="Your email..." value={email} onInput={setEmail} />
                <ModalFooter>
                    <Button type="submit" disabled={!email} isSmall>
                        Reset
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
