import React from "react";
import styled from "styled-components";
import { Content } from "../../app/css/content";
import { H2, FlowText } from "../../app/css/typography";
import { InputButton } from "../../app/layout/molecule/InputButton";
import { useSession } from "../../app/context/user/SessionContext";
import { useRouter } from "next/router";
import { createTeam } from "../../app/lib/api/create";
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

const New: React.FC = () => {
    const router = useRouter();
    const { session } = useSession();

    const newTeam = async (name: string) => {
        if (!session) {
            return;
        }

        const id = await createTeam(name, session.uid);

        router.push(`/teams/${id}`);
    };

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Create new Team - Revu" />
            <Content>
                <PageHead>
                    <PageHeadline as="h1">Create a new team.</PageHeadline>
                    <FlowText>
                        Your project is organized in teams. You can either have multiple teams or
                        solely one - your choice!
                    </FlowText>
                </PageHead>
                <InputButton
                    name="team"
                    placeholder="Your team's name..."
                    button="Let's go"
                    onSubmit={newTeam}
                    loading={!session}
                />
            </Content>
        </PageWrapper>
    );
};

export default New;
