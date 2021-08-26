import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { User } from "../../icon/User";

const AvatarWrapper = styled.div<{ $isSmall?: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: ${p => (p.$isSmall ? "3rem" : "4rem")};
    height: ${p => (p.$isSmall ? "3rem" : "4rem")};
    border-radius: 50%;
    overflow: hidden;
    transform: translateZ(0);
    border: 0.1rem solid ${p => p.theme.gray300};
    background-color: ${p => p.theme.gray300};
    color: ${p => p.theme.gray600};
`;

const NoUserIcon = styled(User)`
    width: 85%;
    height: 85%;
`;

interface AvatarProps {
    photoURL?: string | null;
    isSmall?: boolean;
    loading?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ photoURL, isSmall, loading }) => {
    return (
        <AvatarWrapper $isSmall={isSmall}>
            {!loading &&
                (photoURL ? (
                    <Image src={photoURL} alt="Avatar" layout="fill" objectFit="cover" />
                ) : (
                    <NoUserIcon />
                ))}
        </AvatarWrapper>
    );
};
