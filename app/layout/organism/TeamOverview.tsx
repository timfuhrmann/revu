import React from "react";
import styled from "styled-components";
import { Team, TeamSkeleton } from "../atom/Team";

const TeamsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -1rem;
`;

const TeamWrapper = styled.div`
    flex: 1 1 100%;
    max-width: 100%;
    margin: 1rem;

    @media ${p => p.theme.bp.m} {
        flex: 1 1 calc(50% - 2rem);
        max-width: calc(50% - 2rem);
    }

    @media ${p => p.theme.bp.l} {
        flex: 1 1 calc(33.33% - 2rem);
        max-width: calc(33.33% - 2rem);
    }
`;

const TeamsEmpty = styled.div`
    margin: 1rem auto 0;
    font-size: 1.4rem;
    color: ${p => p.theme.gray600};
`;

interface TeamOverviewProps {
    teams: Data.Team[] | null;
}

export const TeamOverview: React.FC<TeamOverviewProps> = ({ teams }) => {
    return (
        <TeamsList>
            {teams ? (
                teams.length > 0 ? (
                    teams.map(team => (
                        <TeamWrapper key={team.id}>
                            <Team {...team} />
                        </TeamWrapper>
                    ))
                ) : (
                    <TeamsEmpty>No teams found</TeamsEmpty>
                )
            ) : (
                [...Array(6)].map((item, index) => (
                    <TeamWrapper key={index}>
                        <TeamSkeleton />
                    </TeamWrapper>
                ))
            )}
        </TeamsList>
    );
};
