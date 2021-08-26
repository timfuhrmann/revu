import React, { useState } from "react";
import styled from "styled-components";
import { SmallText } from "../../css/typography";
import { ReviewComment } from "../atom/ReviewComment";
import { ChevronDown } from "../../icon/ChevronDown";
import { InputButton } from "./InputButton";

const CommentsWrapper = styled.div``;

const CommentsHead = styled(SmallText)`
    color: ${p => p.theme.gray600};
`;

const CommentsButton = styled.button<{ $active?: boolean; $loading?: boolean }>`
    display: flex;
    align-items: center;
    color: ${p => p.$active && p.theme.gray900};
    transition: color 0.1s;
    will-change: color;
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        color: transparent;
    `};

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const CommentsFrame = styled.div`
    padding-top: 1rem;
`;

const CommentsList = styled.div`
    margin-top: 1rem;
`;

const CommentWrapper = styled.div`
    margin-bottom: 1.5rem;
    padding-top: 1rem;
    border-top: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        margin: 0;
    }
`;

const IconChevron = styled(ChevronDown)<{ $active: boolean }>`
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.5rem;
    stroke-width: 0.2rem;
    transform: ${p => p.$active && "rotate(-180deg)"};
`;

interface ReviewCommentsProps {
    comments: Data.Comment[];
    onSubmit: (value: string) => void;
    forceExpanded?: boolean;
    isDemo?: boolean;
}

export const ReviewComments: React.FC<ReviewCommentsProps> = ({
    comments,
    forceExpanded,
    isDemo,
    onSubmit,
}) => {
    const [active, setActive] = useState<boolean>(forceExpanded || false);

    return (
        <CommentsWrapper>
            <CommentsHead>
                <CommentsButton $active={active} onClick={() => setActive(prevState => !prevState)}>
                    Comments
                    {comments.length > 0 && ` - ${comments.length} total`}
                    <IconChevron $active={active} />
                </CommentsButton>
            </CommentsHead>
            <CommentsFrame hidden={!active}>
                <InputButton
                    name="comment"
                    placeholder="New comment..."
                    button="Send"
                    onSubmit={onSubmit}
                    loading={isDemo}
                    clearOnSubmit
                />
                <CommentsList>
                    {comments
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map(comment => (
                            <CommentWrapper key={comment.createdAt}>
                                <ReviewComment {...comment} />
                            </CommentWrapper>
                        ))}
                </CommentsList>
            </CommentsFrame>
        </CommentsWrapper>
    );
};

export const ReviewCommentsSkeleton: React.FC = () => {
    return (
        <CommentsWrapper>
            <CommentsHead>
                <CommentsButton $loading>Comments</CommentsButton>
            </CommentsHead>
        </CommentsWrapper>
    );
};
