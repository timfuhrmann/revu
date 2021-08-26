import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleBorderColor, StatusSelect, StatusSelectSkeleton } from "../atom/StatusSelect";
import { getPassedTimeByDate } from "../../lib/util";
import { SmallText } from "../../css/typography";
import { Archive } from "../../icon/Archive";
import { Trash } from "../../icon/Trash";
import { ReviewComments, ReviewCommentsSkeleton } from "../molecule/ReviewComments";

const ReviewWrapper = styled.div`
    border-radius: ${p => p.theme.radius};
    background-color: ${p => p.theme.gray100};
    overflow: hidden;
    transform: translateZ(0);
`;

const ReviewFrame = styled.div`
    position: relative;
    z-index: 1;
    padding: 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 3rem;
    }
`;

const ReviewHead = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const ReviewTitle = styled(SmallText)<{ $loading?: boolean }>`
    flex: 1;
    margin: 0 2rem 0.25rem 0;
    color: ${p => p.theme.gray900};
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        max-width: 40rem;
        color: transparent;
    `}

    @media ${p => p.theme.bp.l} {
        margin: 0 4rem 0.25rem 0;
    }
`;

const ReviewLink = styled(SmallText)<{ $loading?: boolean }>`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${p => p.theme.gray600};
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        max-width: 30rem;
        color: transparent;
    `}
`;

const ReviewControls = styled.div`
    background-color: ${p => p.theme.gray200};
    padding: 1.5rem 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 1.5rem 3rem;
    }
`;

const ReviewControlsInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
`;

const ReviewCommentsWrapper = styled.div`
    margin-top: 1rem;
`;

const ActionButton = styled.button`
    color: ${p => p.theme.gray600};
    transition: color 0.1s;
    will-change: color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const ArchiveIcon = styled(Archive)`
    width: 2rem;
    height: 2rem;
`;

const DeleteIcon = styled(Trash)`
    width: 2rem;
    height: 2rem;
`;

const ReviewRedirect = styled.a<{ $status: Data.ReviewStatus }>`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0.1rem solid transparent;
    border-radius: ${p => p.theme.radius};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition: 0.1s border-color;
    will-change: border-color;

    &:active {
        ${handleBorderColor};
    }
`;

const ReviewTimestamp = styled(SmallText)`
    color: ${p => p.theme.gray600};
`;

interface ReviewProps extends Data.Review {
    onArchive: () => void;
    onDelete: () => void;
    onComment: (comment: string) => void;
    onSelect: (value: Data.ReviewStatus) => void;
    isDemo?: boolean;
    forceExpanded?: boolean;
}

export const Review: React.FC<ReviewProps> = ({
    comments,
    link,
    createdAt,
    status,
    archived,
    isDemo,
    forceExpanded,
    onArchive,
    onComment,
    onDelete,
    onSelect,
}) => {
    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        if (!link) {
            return;
        }

        fetch(`/api/title?link=${link}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    setTitle("");
                }
            })
            .then(res => {
                if (res && res.title) {
                    setTitle(res.title);
                }
            });
    }, [link]);

    const handleSelect = (value: Data.ReviewStatus) => {
        if (value === status) {
            return;
        }

        onSelect(value);
    };

    return (
        <ReviewWrapper>
            <ReviewFrame>
                <ReviewHead>
                    <ReviewTitle
                        $loading={title === null || isDemo}
                        dangerouslySetInnerHTML={{ __html: title || "No title found" }}
                    />
                    <ReviewTimestamp>{getPassedTimeByDate(createdAt)}</ReviewTimestamp>
                </ReviewHead>
                <ReviewLink $loading={isDemo}>{link || "No link found"}</ReviewLink>
                {!isDemo && (
                    <ReviewRedirect
                        href={link}
                        target="_blank"
                        security="noreferrer noopener"
                        $status={status}
                    />
                )}
            </ReviewFrame>
            <ReviewControls>
                <ReviewControlsInner>
                    <StatusSelect active={status} onSelect={handleSelect} />
                    {archived ? (
                        <ActionButton type="button" title="Delete" onClick={onDelete}>
                            <DeleteIcon />
                        </ActionButton>
                    ) : (
                        <ActionButton type="button" title="Archive" onClick={onArchive}>
                            <ArchiveIcon />
                        </ActionButton>
                    )}
                </ReviewControlsInner>
                <ReviewCommentsWrapper>
                    <ReviewComments
                        comments={comments}
                        onSubmit={onComment}
                        forceExpanded={forceExpanded}
                        isDemo={isDemo}
                    />
                </ReviewCommentsWrapper>
            </ReviewControls>
        </ReviewWrapper>
    );
};

export const ReviewSkeleton: React.FC = () => {
    return (
        <ReviewWrapper>
            <ReviewFrame>
                <ReviewTitle $loading>Loading</ReviewTitle>
                <ReviewLink as="div" $loading>
                    Loading
                </ReviewLink>
            </ReviewFrame>
            <ReviewControls>
                <ReviewControlsInner>
                    <StatusSelectSkeleton />
                </ReviewControlsInner>
                <ReviewCommentsWrapper>
                    <ReviewCommentsSkeleton />
                </ReviewCommentsWrapper>
            </ReviewControls>
        </ReviewWrapper>
    );
};
