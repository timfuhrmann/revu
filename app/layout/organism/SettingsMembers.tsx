import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { H4, H5, SmallText } from "../../css/typography";
import { Button } from "../atom/Button";
import { useData } from "../../context/data/DataContext";
import { Member, MemberSkeleton } from "../atom/Member";
import { CopyModal } from "../molecule/CopyModal";
import { Select } from "../atom/Select";
import { moveUserToTop, rolesMap } from "../../lib/util";
import { ConfirmModal } from "../molecule/ConfirmModal";
import { useSession } from "../../context/user/SessionContext";

const SettingsTitle = styled(H4)`
    margin-bottom: 1rem;
`;

const SettingsFrame = styled.div`
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

const SettingsHead = styled.div`
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid ${p => p.theme.gray200};
`;

const SettingsInvite = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 0 3rem;
`;

const SettingsActive = styled.div`
    margin-top: 1.5rem;
`;

const MemberWrapper = styled.div`
    margin-bottom: 1.5rem;

    &:last-child {
        margin: 0;
    }
`;

interface SettingProps {
    title: string;
    desc: string;
}

export const SettingsMembers: React.FC<SettingProps> = ({ title, desc }) => {
    const { session } = useSession();
    const { team, handleNewInvitation, isOwner, handleDeleteMember } = useData();
    const [invitationId, setInvitationId] = useState<string>("");
    const [deleteId, setDeleteId] = useState<string>("");
    const [value, setValue] = useState<string>("0");
    const [memberIds, setMemberIds] = useState<string[] | null>(null);

    useEffect(() => {
        getMembers();
    }, [team, session]);

    const getMembers = async () => {
        if (!team || !session) {
            return;
        }

        setMemberIds(moveUserToTop(session.uid, Object.keys(team.roles)));
    };

    const handleLink = async () => {
        const id = await handleNewInvitation(parseInt(value, 10) as Data.Role);

        if (!id) {
            return;
        }

        setInvitationId(id);
    };

    const handleDelete = async () => {
        if (!deleteId) {
            return;
        }

        await handleDeleteMember(deleteId);
        setDeleteId("");
    };

    return (
        <SettingsFrame>
            <SettingsContent>
                <SettingsTitle>{title}</SettingsTitle>
                <SettingsText>{desc}</SettingsText>
                <SettingsHead>
                    <H5>Add new</H5>
                </SettingsHead>
                <SettingsInvite>
                    <Select value={value} setValue={setValue} options={rolesMap} />
                    <Button action={handleLink} disabled={!isOwner()}>
                        Invite Link
                    </Button>
                </SettingsInvite>
                <SettingsHead>
                    <H5>Active members</H5>
                </SettingsHead>
                <SettingsActive>
                    {team && memberIds
                        ? memberIds.map(uid => (
                              <MemberWrapper key={uid}>
                                  <Member uid={uid} role={team.roles[uid]} onDelete={setDeleteId} />
                              </MemberWrapper>
                          ))
                        : [...Array(4)].map((item, index) => (
                              <MemberWrapper key={index}>
                                  <MemberSkeleton />
                              </MemberWrapper>
                          ))}
                </SettingsActive>
            </SettingsContent>
            {invitationId && (
                <CopyModal
                    title="Invite Link"
                    desc="Allow other people to join your team through the link below."
                    value={`${process.env.NEXT_PUBLIC_APP_URL}/invite/${invitationId}`}
                    onClose={() => setInvitationId("")}
                />
            )}
            {deleteId && (
                <ConfirmModal
                    title="Delete Member"
                    desc="Remove member from active team. Any resources the member has added to the team will remain."
                    onConfirm={handleDelete}
                    onClose={() => setDeleteId("")}
                />
            )}
        </SettingsFrame>
    );
};
