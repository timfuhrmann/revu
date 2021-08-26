import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMember } from "../../lib/api/get";
import { SmallText } from "../../css/typography";
import { getPassedTimeByDate } from "../../lib/util";
import { Avatar } from "./Avatar";

const CommentWrapper = styled.div``;

const CommentHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const HeadGroup = styled.div`
    display: flex;
    align-items: center;
`;

const MemberName = styled.div<{ $loading: boolean }>`
    margin-left: 1rem;
    color: ${p => p.theme.gray900};
    ${p =>
        p.$loading &&
        `
        background-color: ${p.theme.gray300};
        border-radius: ${p.theme.radius};
        color: transparent;
    `}
`;

const CommentMessage = styled.div`
    color: ${p => p.theme.gray900};
`;

const CommentDate = styled.div``;

export const ReviewComment: React.FC<Data.Comment> = ({ uid, message, createdAt }) => {
    const [member, setMember] = useState<Auth.Session | null>(null);

    useEffect(() => {
        if (!uid) {
            return;
        }

        getMember(uid).then(setMember);
    }, []);

    return (
        <CommentWrapper>
            <SmallText>
                <CommentHead>
                    <HeadGroup>
                        <Avatar loading={!uid} photoURL={member?.photoURL} isSmall />
                        <MemberName $loading={!member || (!member.displayName && !member.email)}>
                            {member ? member.displayName || member.email : "Loading..."}
                        </MemberName>
                    </HeadGroup>
                    <CommentDate>{getPassedTimeByDate(createdAt)}</CommentDate>
                </CommentHead>
                <CommentMessage>{message}</CommentMessage>
            </SmallText>
        </CommentWrapper>
    );
};
