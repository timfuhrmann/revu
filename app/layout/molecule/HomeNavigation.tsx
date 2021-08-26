import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "../atom/Button";
import { ContentLarge } from "../../css/content";

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 10rem;
`;

const Logo = styled.a`
    display: block;
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -0.2rem;
    line-height: 1;
    margin-top: -1rem;
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const NavigationControls = styled.div`
    display: flex;
`;

const SecondaryButtonWrapper = styled.div`
    margin-right: 1rem;
`;

const Highlight = styled.span`
    color: ${p => p.theme.primary};
`;

export const HomeNavigation: React.FC = () => {
    return (
        <NavigationWrapper>
            <ContentLarge>
                <NavigationInner>
                    <Link href="/" passHref>
                        <Logo>
                            revu<Highlight>.</Highlight>
                        </Logo>
                    </Link>
                    <NavigationControls>
                        <SecondaryButtonWrapper>
                            <Button action="/login" isTertiary>
                                Login
                            </Button>
                        </SecondaryButtonWrapper>
                        <Button action="/signup">Sign Up</Button>
                    </NavigationControls>
                </NavigationInner>
            </ContentLarge>
        </NavigationWrapper>
    );
};
