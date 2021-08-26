import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { H4, InputText } from "../../css/typography";
import { Modal } from "../atom/Modal";
import { useRouter } from "next/router";
import { Button } from "../atom/Button";
import { createFeedback } from "../../lib/api/create";
import { useSession } from "../../context/user/SessionContext";
import { Textarea } from "../atom/Textarea";

const ModalTitle = styled(H4)`
    margin-bottom: 1rem;
`;

const ModalContent = styled.form`
    padding: 4rem;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

const EmojiButtons = styled.div`
    display: flex;
`;

const EmojiButton = styled.button<{ $active?: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.1rem solid ${p => (p.$active ? p.theme.primary : p.theme.gray200)};
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    transition: border-color 0.1s;
    will-change: border-color;

    &:last-child {
        margin: 0;
    }

    @media (hover: hover) {
        &:hover {
            border-color: ${p => !p.$active && p.theme.gray900};
        }
    }
`;

export const FeedbackModal: React.FC = () => {
    const router = useRouter();
    const { modal } = router.query;
    const { session } = useSession();
    const [message, setMessage] = useState<string>("");
    const [emoji, setEmoji] = useState<number | null>(null);

    const onClose = () => {
        router.push({ query: { ...router.query, modal: undefined } }, router.asPath, {
            shallow: true,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!message || !session) {
            return;
        }

        createFeedback(message, emoji, session.uid);

        setMessage("");
        setEmoji(null);
        onClose();
    };

    if (modal !== "feedback") return null;

    return (
        <Modal onClose={onClose}>
            <ModalContent onSubmit={onSubmit}>
                <ModalTitle>Feedback</ModalTitle>
                <InputText>
                    <Textarea
                        name="message"
                        value={message}
                        placeholder="Your feedback..."
                        onInput={setMessage}
                    />
                </InputText>
                <ModalFooter>
                    <EmojiButtons>
                        <EmojiButton
                            type="button"
                            $active={emoji === 0}
                            onClick={() => setEmoji(0)}>
                            <Image
                                src="/emoji/heart.png"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </EmojiButton>
                        <EmojiButton
                            type="button"
                            $active={emoji === 1}
                            onClick={() => setEmoji(1)}>
                            <Image
                                src="/emoji/smile.png"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </EmojiButton>
                        <EmojiButton
                            type="button"
                            $active={emoji === 2}
                            onClick={() => setEmoji(2)}>
                            <Image
                                src="/emoji/neutral.png"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </EmojiButton>
                        <EmojiButton
                            type="button"
                            $active={emoji === 3}
                            onClick={() => setEmoji(3)}>
                            <Image
                                src="/emoji/crying.png"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </EmojiButton>
                    </EmojiButtons>
                    <Button type="submit" isSmall>
                        Send
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
