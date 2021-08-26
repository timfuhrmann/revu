import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { H5 } from "../../css/typography";
import { Gear } from "../../icon/Gear";
import { getPassedTimeByDate } from "../../lib/util";

const TeamWrapper = styled.div<{ $loading?: boolean }>`
    position: relative;
    display: block;
    padding: 3rem;
    border: 0.1rem solid transparent;
    background-color: ${p => p.theme.gray100};
    border-radius: ${p => p.theme.radius};
    transition: border-color 0.1s;
    will-change: border-color;

    @media (hover: hover) {
        &:hover {
            border-color: ${p => !p.$loading && p.theme.gray300};
        }
    }
`;

const TeamName = styled.div<{ $loading?: boolean }>`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        max-width: 15rem;
        min-height: 2rem;
        color: transparent;
    `}
`;

const TeamActivities = styled.div<{ $loading?: boolean }>`
    color: ${p => p.theme.gray600};
    font-size: 1.4rem;
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        max-width: 10rem;
        color: transparent;
    `}
`;

const SettingsButton = styled.a`
    z-index: 2;
    display: flex;
    color: ${p => p.theme.gray600};
    transition: 0.1s color;
    will-change: color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const IconGear = styled(Gear)`
    width: 2rem;
    height: 2rem;
`;

const TeamRedirect = styled.a<{ $status?: Data.ReviewStatus }>`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const Team: React.FC<Data.Team> = ({ name, id, updatedAt }) => {
    return (
        <TeamWrapper>
            <TeamName>
                <H5>{name}</H5>
                <Link href={`/settings/${id}`} passHref>
                    <SettingsButton>
                        <IconGear />
                    </SettingsButton>
                </Link>
            </TeamName>
            <TeamActivities>{getPassedTimeByDate(updatedAt)}</TeamActivities>
            <Link href={`/teams/${id}`} passHref>
                <TeamRedirect />
            </Link>
        </TeamWrapper>
    );
};

export const TeamSkeleton: React.FC = () => {
    return (
        <TeamWrapper $loading>
            <TeamName $loading>
                <H5>Loading</H5>
            </TeamName>
            <TeamActivities $loading>Loading</TeamActivities>
        </TeamWrapper>
    );
};
