import React from "react";
import styled from "styled-components";
import { H3 } from "../../app/css/typography";
import { Content } from "../../app/css/content";
import { SettingsInput } from "../../app/layout/molecule/SettingsInput";
import { useData } from "../../app/context/data/DataContext";
import { SettingsMembers } from "../../app/layout/organism/SettingsMembers";
import { SettingsAlert } from "../../app/layout/organism/SettingsAlert";
import { Meta } from "../../app/lib/Meta";
import { LoginModal } from "../../app/layout/organism/LoginModal";

const PageWrapper = styled.div`
    padding: 10rem 0;
    min-height: calc(100vh - 7.5vh);
`;

const PageHead = styled.div`
    padding: 3rem 0;
    border-top: 0.1rem solid ${p => p.theme.gray200};
    border-bottom: 0.1rem solid ${p => p.theme.gray200};

    @media ${p => p.theme.bp.l} {
        padding: 6rem 0;
    }
`;

const PageContent = styled(Content)`
    padding: 2rem 0 0;

    @media ${p => p.theme.bp.l} {
        padding: 4rem 0 0;
    }
`;

const SettingsWrapper = styled.div`
    margin-bottom: 2rem;

    &:last-child {
        margin: 0;
    }

    @media ${p => p.theme.bp.l} {
        margin-bottom: 4rem;
    }
`;

const TeamSettings: React.FC = () => {
    const { team, isOwner, handleDeleteTeam, handleLeaveTeam, handleName } = useData();

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Team Settings - Revu" />
            <PageHead>
                <Content>
                    <H3 as="h1">Team Settings</H3>
                </Content>
            </PageHead>
            <PageContent>
                <SettingsWrapper>
                    <SettingsInput
                        title="Name"
                        desc="Used to identify your team on the dashboard and in the url."
                        initialValue={team ? team.name : null}
                        onSave={handleName}
                        disabled={!team || !isOwner()}
                    />
                </SettingsWrapper>
                <SettingsWrapper>
                    <SettingsMembers title="Members" desc="Manage and invite team members." />
                </SettingsWrapper>
                <SettingsWrapper>
                    <SettingsAlert
                        title="Leave Team"
                        desc="Revoke your access to this team. Any resources you've added to the team will remain."
                        button="Leave Team"
                        confirmDesc="You are trying to leave this team."
                        confirmString="leave"
                        onConfirm={handleLeaveTeam}
                        disabled={!team}
                        hasConfirm
                    />
                </SettingsWrapper>
                <SettingsWrapper>
                    <SettingsAlert
                        title="Delete Team"
                        desc="Permanently remove your team and all of its contents from this platform. This action is not reversible – please continue with caution."
                        button="Delete Team"
                        confirmDesc="You are trying to delete this team."
                        confirmString="delete"
                        onConfirm={handleDeleteTeam}
                        disabled={!team || !isOwner()}
                        hasConfirm
                    />
                </SettingsWrapper>
            </PageContent>
        </PageWrapper>
    );
};

export default TeamSettings;
