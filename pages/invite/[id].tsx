import React from "react";
import styled from "styled-components";
import { Content } from "../../app/css/content";
import { FlowText, H2 } from "../../app/css/typography";
import { Button } from "../../app/layout/atom/Button";
import { useData } from "../../app/context/data/DataContext";
import { Meta } from "../../app/lib/meta";
import { LoginModal } from "../../app/layout/organism/LoginModal";

const PageWrapper = styled.div`
    display: flex;
    padding: 15rem 0;
    min-height: calc(100vh - 7.5vh);
`;

const PageHeadline = styled(H2)`
    margin-bottom: 1rem;
`;

const PageHead = styled.div`
    margin-bottom: 4rem;
`;

const Invite: React.FC = () => {
    const { handleInvitation } = useData();

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Join Team - Revu" />
            <Content>
                <PageHead>
                    <PageHeadline>Join your team!</PageHeadline>
                    <FlowText>
                        You have been invited to join a team. Either choose to accept the invitation
                        or ignore it.
                    </FlowText>
                </PageHead>
                <Button action={handleInvitation}>Accept</Button>
            </Content>
        </PageWrapper>
    );
};

export default Invite;
