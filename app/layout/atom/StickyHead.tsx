import React from "react";
import styled from "styled-components";
import { Content } from "../../css/content";
import { H4 } from "../../css/typography";

const HeadWrapper = styled.div`
    position: sticky;
    z-index: 4;
    top: -2.5rem;
    padding: 10rem 0 2.5rem;
    background-color: ${p => p.theme.gray100};
    border-bottom: 0.1rem solid ${p => p.theme.gray200};
`;

const HeadTitle = styled(H4)`
    margin-bottom: 1rem;
`;

interface StickyHeadProps {
    title: string;
}

export const StickyHead: React.FC<StickyHeadProps> = ({ title, children }) => {
    return (
        <HeadWrapper>
            <Content>
                <HeadTitle>{title}</HeadTitle>
                {children}
            </Content>
        </HeadWrapper>
    );
};
