import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { H4, SmallText } from "../../css/typography";
import { SettingsFooter } from "../atom/SettingsFooter";
import { ConfirmModal } from "../molecule/ConfirmModal";

const SettingsTitle = styled(H4)`
    margin-bottom: 1rem;
`;

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

interface SettingProps {
    title: string;
    desc: string;
    button: string;
    onConfirm: () => void;
    confirmDesc?: string;
    confirmString?: string;
    hasConfirm?: boolean;
    disabled?: boolean;
}

export const SettingsAlert: React.FC<SettingProps> = ({
    title,
    desc,
    button,
    confirmDesc,
    confirmString,
    hasConfirm,
    onConfirm,
    disabled,
}) => {
    const [confirm, setConfirm] = useState<boolean>(false);

    return (
        <SettingsFrame>
            <SettingsContent>
                <SettingsTitle>{title}</SettingsTitle>
                <SmallText>{desc}</SmallText>
            </SettingsContent>
            <SettingsFooter
                onClick={() => {
                    if (hasConfirm) {
                        setConfirm(true);
                    } else {
                        onConfirm();
                    }
                }}
                button={button}
                disabled={disabled}
                isSecondary
            />
            {confirm && confirmString && (
                <ConfirmModal
                    title={title}
                    desc={confirmDesc}
                    confirmString={confirmString}
                    onConfirm={onConfirm}
                    onClose={() => setConfirm(false)}
                />
            )}
        </SettingsFrame>
    );
};
