import React, { useState } from "react";
import styled from "styled-components";
import { H4, H5, SmallText } from "../../css/typography";
import { SettingsFooter } from "../atom/SettingsFooter";
import { Input } from "../atom/Input";
import { Textarea } from "../atom/Textarea";

const SettingsFrame = styled.div`
    border: 0.1rem solid ${p => p.theme.gray200};
    border-radius: ${p => p.theme.radius};
`;

const SettingsContent = styled.div`
    padding: 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 3rem;
    }
`;

const SettingsHeadline = styled(H5)`
    margin: 3rem 0 1rem;
`;

const SettingsTitle = styled(H4)`
    margin-bottom: 1rem;
`;

const SettingsText = styled(SmallText)`
    margin-bottom: 3rem;
`;

const ErrorWrapper = styled.div`
    margin-top: 1rem;
    color: ${p => p.theme.red400};
`;

export interface ContactData {
    subject: string;
    message: string;
}

interface SettingProps {
    title: string;
    error: string;
    disabled?: boolean;
    onSubmit: (form: ContactData) => void;
}

export const SettingsContact: React.FC<SettingProps> = ({ title, error, disabled, onSubmit }) => {
    const [form, setForm] = useState<ContactData>({
        subject: "",
        message: "",
    });

    const handleInput = (selector: keyof ContactData, value: string) => {
        setForm(prevState => {
            return {
                ...prevState,
                [selector]: value,
            };
        });
    };

    return (
        <SettingsFrame>
            <SettingsContent>
                <SettingsTitle>{title}</SettingsTitle>
                <SettingsText>Please complete the form before submitting a request.</SettingsText>
                <SettingsHeadline>Subject</SettingsHeadline>
                <Input
                    name="subject"
                    value={form.subject}
                    placeholder="Your subject..."
                    onInput={value => handleInput("subject", value)}
                    loading={disabled}
                />
                <SettingsHeadline>Message</SettingsHeadline>
                <Textarea
                    name="message"
                    value={form.message}
                    placeholder="Please describe your issue..."
                    onInput={value => handleInput("message", value)}
                    loading={disabled}
                />
                {error && <ErrorWrapper>{error}</ErrorWrapper>}
            </SettingsContent>
            <SettingsFooter
                onClick={() => onSubmit(form)}
                disabled={disabled || !form.subject || !form.message}
                button="Submit"
            />
        </SettingsFrame>
    );
};
