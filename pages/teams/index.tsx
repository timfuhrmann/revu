import React, { useState } from "react";
import styled from "styled-components";
import { Content } from "../../app/css/content";
import { Input } from "../../app/layout/atom/Input";
import { Plus } from "../../app/icon/Plus";
import { ButtonFrame } from "../../app/layout/atom/ButtonFrame";
import { TeamOverview } from "../../app/layout/organism/TeamOverview";
import { StickyHead } from "../../app/layout/atom/StickyHead";
import { useData } from "../../app/context/data/DataContext";
import { useTeamsSearch } from "../../app/lib/search";
import { Meta } from "../../app/lib/Meta";
import { useSession } from "../../app/context/user/SessionContext";
import { LoginModal } from "../../app/layout/organism/LoginModal";

const PageWrapper = styled.div`
    min-height: calc(100vh - 7.5vh);
`;

const PageContent = styled.div`
    padding: 2.5rem 0;
`;

const PageControls = styled.div`
    display: flex;
`;

const InputWrapper = styled.div`
    flex: 1;
    margin-right: 1.5rem;
`;

const PlusIcon = styled(Plus)`
    width: 2.2rem;
    height: 2.2rem;
`;

const Teams: React.FC = () => {
    const { teams } = useData();
    const { value, setValue, filteredResults } = useTeamsSearch(teams);

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Teams - Revu" />
            <StickyHead title="Teams">
                <PageControls>
                    <InputWrapper>
                        <Input
                            name="search"
                            placeholder="Search..."
                            value={value}
                            onInput={setValue}
                        />
                    </InputWrapper>
                    <ButtonFrame action="/new" title="Create Team">
                        <PlusIcon />
                    </ButtonFrame>
                </PageControls>
            </StickyHead>
            <PageContent>
                <Content>
                    <TeamOverview teams={filteredResults} />
                </Content>
            </PageContent>
        </PageWrapper>
    );
};

export default Teams;
