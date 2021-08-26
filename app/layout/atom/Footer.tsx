import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ContentLarge } from "../../css/content";
import { SmallText } from "../../css/typography";

const FooterWrapper = styled.div`
    width: 100%;
    border-top: 0.1rem solid ${p => p.theme.gray200};
`;

const FooterInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 7.5rem;
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 2rem;
`;

const FooterLink = styled.a`
    transition: color 0.1s;
    will-change: color;

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

export const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <SmallText>
                <ContentLarge>
                    <FooterInner>
                        &copy; 2021 Tim Fuhrmann
                        <FooterLinks>
                            <Link href="/legal" passHref>
                                <FooterLink>Legal</FooterLink>
                            </Link>
                            <Link href="/privacy" passHref>
                                <FooterLink>Privacy</FooterLink>
                            </Link>
                        </FooterLinks>
                    </FooterInner>
                </ContentLarge>
            </SmallText>
        </FooterWrapper>
    );
};
