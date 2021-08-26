import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMember } from "../../lib/api/get";
import { AccentText, ButtonText } from "../../css/typography";
import { Select } from "./Select";
import { Trash } from "../../icon/Trash";
import { rolesMap } from "../../lib/util";
import { useData } from "../../context/data/DataContext";
import { useSession } from "../../context/user/SessionContext";
import { Avatar } from "./Avatar";

const MemberWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const MemberInfo = styled.div`
    flex: 1;
    overflow: hidden;
    margin-left: 1rem;

    @media ${p => p.theme.bp.l} {
        margin-left: 2rem;
    }
`;

const MemberName = styled.div<{ $loading?: boolean }>`
    margin-bottom: 0.25rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        max-width: 30rem;
        color: transparent;
    `}
`;

const MemberEmail = styled.div<{ $loading?: boolean }>`
    color: ${p => p.theme.gray600};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        max-width: 25rem;
        color: transparent;
    `}
`;

const DeleteButton = styled.button`
    display: flex;
    margin-left: 1rem;
    color: ${p => p.theme.gray600};
    transition: color 0.1s;
    will-change: color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const DeleteIcon = styled(Trash)`
    width: 1.8rem;
    height: 1.8rem;
`;

const DisabledRole = styled(ButtonText)`
    color: ${p => p.theme.gray600};
`;

interface MemberProps extends Data.Member {
    onDelete: (uid: string) => void;
}

export const Member: React.FC<MemberProps> = ({ uid, role, onDelete }) => {
    const { session } = useSession();
    const { handleRole, isOwner } = useData();
    const [member, setMember] = useState<Auth.Session | null>(null);
    const [currentRole, setCurrentRole] = useState<Data.Role>(role);

    useEffect(() => {
        if (!uid) {
            return;
        }

        getMember(uid).then(setMember);
    }, [uid]);

    const handleNewRole = async (value: string) => {
        const r = parseInt(value) as Data.Role;
        await handleRole(uid, r);
        setCurrentRole(r);
    };

    if (!member || !session) return <MemberSkeleton />;

    const isUser = uid === session.uid;

    return (
        <AccentText>
            <MemberWrapper>
                <Avatar photoURL={member.photoURL} loading={!member || !member.photoURL} />
                <MemberInfo>
                    <MemberName>{member.displayName || member.email}</MemberName>
                    {member.displayName && <MemberEmail>{member.email}</MemberEmail>}
                </MemberInfo>
                {isUser || !isOwner() ? (
                    <DisabledRole>{rolesMap[role]}</DisabledRole>
                ) : (
                    <Select
                        value={currentRole.toString()}
                        setValue={handleNewRole}
                        options={rolesMap}
                        isSecondary
                    />
                )}
                {!isUser && isOwner() && (
                    <DeleteButton type="button" onClick={() => onDelete(uid)}>
                        <DeleteIcon />
                    </DeleteButton>
                )}
            </MemberWrapper>
        </AccentText>
    );
};

export const MemberSkeleton = () => {
    return (
        <MemberWrapper>
            <Avatar loading />
            <MemberInfo>
                <MemberName $loading>Loading</MemberName>
                <MemberEmail $loading>Loading</MemberEmail>
            </MemberInfo>
        </MemberWrapper>
    );
};
