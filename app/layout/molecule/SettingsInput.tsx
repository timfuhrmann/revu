import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { H4, SmallText } from "../../css/typography";
import { SettingsFooter } from "../atom/SettingsFooter";
import { Input } from "../atom/Input";

const SettingsTitle = styled(H4)`
    margin-bottom: 1rem;
`;

const SettingsFrame = styled.form`
    border: 0.1rem solid ${p => p.theme.gray200};
    border-radius: ${p => p.theme.radius};
`;

const SettingsText = styled(SmallText)`
    margin-bottom: 3rem;
`;

const SettingsContent = styled.div`
    padding: 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 3rem;
    }
`;

interface SettingProps {
    title: string;
    desc?: string;
    initialValue: string | null;
    onSave: (value: string) => void;
    disabled?: boolean;
}

export const SettingsInput: React.FC<SettingProps> = ({
    title,
    initialValue,
    desc,
    disabled,
    onSave,
}) => {
    const [value, setValue] = useState<string | null>(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!value) {
            return;
        }

        onSave(value);
    };

    return (
        <SettingsFrame onSubmit={handleSubmit}>
            <SettingsContent>
                <SettingsTitle>{title}</SettingsTitle>
                {desc && <SettingsText>{desc}</SettingsText>}
                <Input
                    name="title"
                    placeholder={title}
                    value={value || ""}
                    onInput={setValue}
                    loading={value === null}
                    disabled={disabled}
                />
            </SettingsContent>
            <SettingsFooter
                disabled={disabled || value === initialValue || value === null}
                type="submit"
                button="Save"
            />
        </SettingsFrame>
    );
};
