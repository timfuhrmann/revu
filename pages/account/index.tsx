import React from "react";
import styled from "styled-components";
import { Content } from "../../app/css/content";
import { H3 } from "../../app/css/typography";
import { SettingsAlert } from "../../app/layout/organism/SettingsAlert";
import { useSession } from "../../app/context/user/SessionContext";
import { Meta } from "../../app/lib/Meta";
import { LoginModal } from "../../app/layout/organism/LoginModal";
import { deleteAccount } from "../../app/lib/api/delete";
import { useRouter } from "next/router";

const PageWrapper = styled.div`
    min-height: calc(100vh - 7.5vh);
    padding: 10rem 0;
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

const Account: React.FC = () => {
    const router = useRouter();
    const { session, handleSignOut } = useSession();

    const handleDeleteAccount = async () => {
        await deleteAccount();
        router.replace("/");
    };

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Account Settings - Revu" />
            <PageHead>
                <Content>
                    <H3 as="h1">Account Settings</H3>
                </Content>
            </PageHead>
            <PageContent>
                {/*Todo: Name changes for credentials only*/}
                {/*<SettingsWrapper>*/}
                {/*    <SettingsInput*/}
                {/*        title="Name"*/}
                {/*        desc="Used to identify you as team member on the dashboard."*/}
                {/*        initialValue={session ? session.displayName : null}*/}
                {/*        onSave={() => null}*/}
                {/*        disabled={!session}*/}
                {/*    />*/}
                {/*</SettingsWrapper>*/}
                <SettingsWrapper>
                    <SettingsAlert
                        title="Sign Out"
                        desc="Sign out your current session."
                        button="Sign Out"
                        onConfirm={handleSignOut}
                        disabled={!session}
                    />
                </SettingsWrapper>
                <SettingsWrapper>
                    <SettingsAlert
                        title="Delete Account"
                        desc="Permanently delete your account from this platform. Teams with only you as a member left will be deleted as well. This action is not reversible – please continue with caution."
                        button="Delete Account"
                        confirmDesc="You are trying to delete this account."
                        confirmString="delete"
                        onConfirm={handleDeleteAccount}
                        disabled={!session}
                        hasConfirm
                    />
                </SettingsWrapper>
            </PageContent>
        </PageWrapper>
    );
};

export default Account;
