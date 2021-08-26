import React from "react";
import styled, { css } from "styled-components";
import { ChipText } from "../../css/typography";
import { statusMap } from "../../lib/util";

export const handleBorderColor = css<{ $status: Data.ReviewStatus }>`
    border-color: ${({ theme, $status }) => {
        switch ($status) {
            case 0:
                return theme.gray600;
            case 1:
                return theme.green;
            case 2:
                return theme.yellow;
            case 3:
                return theme.red;
        }
    }};
`;

const handleBackgroundColor = css<{ $status: Data.ReviewStatus }>`
    background-color: ${({ theme, $status }) => {
        switch ($status) {
            case 0:
                return theme.gray600;
            case 1:
                return theme.green;
            case 2:
                return theme.yellow;
            case 3:
                return theme.red;
        }
    }};
`;

const SelectWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const SelectChip = styled.button<{
    $active?: boolean;
    $status: Data.ReviewStatus;
    $loading?: boolean;
}>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    color: ${p => (p.$active ? p.theme.gray900 : p.theme.gray600)};
    border-width: 0.1rem;
    border-style: solid;
    border-radius: ${p => p.theme.radius};
    ${handleBorderColor};
    border-color: ${p => !p.$active && p.theme.gray300};
    border-color: ${p => p.$loading && p.theme.gray200};
    transition: border-color 0.1s, color 0.1s;
    will-change: border-color, color;

    &::after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        display: ${p => (p.$loading ? "block" : "none")};
        width: 100%;
        height: 100%;
        background-color: ${p => p.theme.gray300};
        border-radius: ${p => p.theme.radius};
    }

    @media (hover: hover) {
        &:hover {
            border-color: ${p => !p.$active && p.theme.gray600};
            color: ${p => !p.$active && p.theme.gray900};
        }
    }
`;

const SelectText = styled(ChipText)`
    margin-left: 0.5rem;
`;

const StatusFrame = styled.div<{ $active?: boolean; $status: Data.ReviewStatus }>`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    ${handleBackgroundColor};
    background-color: ${p => !p.$active && p.theme.gray300};
    transition: background-color 0.1s;
    will-change: background-color;
`;

interface StatusSelectProps {
    active: Data.ReviewStatus;
    onSelect: (value: Data.ReviewStatus) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({ active, onSelect }) => {
    return (
        <SelectWrapper>
            {Object.keys(statusMap).map(statusKey => {
                const status = parseInt(statusKey) as Data.ReviewStatus;

                return (
                    <SelectChip
                        key={status}
                        title={statusMap[status]}
                        $active={status === active}
                        $status={status}
                        onClick={() => onSelect(status)}>
                        <StatusFrame $status={status} $active={status === active} />
                        <SelectText>{statusMap[status]}</SelectText>
                    </SelectChip>
                );
            })}
        </SelectWrapper>
    );
};

export const StatusSelectSkeleton: React.FC = () => {
    return (
        <SelectWrapper>
            {Object.keys(statusMap).map(statusKey => {
                const status = parseInt(statusKey) as Data.ReviewStatus;

                return (
                    <SelectChip key={status} $status={status} $loading>
                        <StatusFrame $status={status} />
                        <SelectText>{statusMap[status]}</SelectText>
                    </SelectChip>
                );
            })}
        </SelectWrapper>
    );
};
