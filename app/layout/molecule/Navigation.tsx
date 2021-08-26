import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useCustomTheme } from "../../context/theme/CustomThemeProvider";
import { useSession } from "../../context/user/SessionContext";
import { Sun } from "../../icon/Sun";
import { Moon } from "../../icon/Moon";
import { useRouter } from "next/router";
import { ContentLarge } from "../../css/content";
import { Avatar } from "../atom/Avatar";

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

const Logo = styled.div`
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -0.2rem;
    line-height: 1;
    margin-top: -1rem;
`;

const Highlight = styled.span`
    color: ${p => p.theme.primary};
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const NavigationList = styled.div`
    display: none;
    align-items: center;
    margin-left: 5rem;

    @media ${p => p.theme.bp.l} {
        display: flex;
        margin-left: 12.5rem;
    }
`;

const NavigationGroup = styled.div`
    display: flex;
    align-items: center;
`;

const NavigationItem = styled.a`
    font-size: 1.5rem;
    letter-spacing: -0.02rem;
    font-weight: 600;
    margin-left: 2.5rem;
    line-height: 1;
    color: ${p => p.theme.gray600};
    transition: color 0.1s;
    will-change: color;

    &:first-child {
        margin: 0;
    }

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }
`;

const IconSun = styled(Sun)`
    width: 2rem;
    height: 2rem;
`;

const IconMoon = styled(Moon)`
    width: 2rem;
    height: 2rem;
`;

export const Navigation: React.FC = () => {
    const router = useRouter();
    const { session } = useSession();
    const { theme, toggleTheme } = useCustomTheme();

    const openFeedback = () => {
        router.push({ query: { ...router.query, modal: "feedback" } }, router.asPath, {
            shallow: true,
        });
    };

    return (
        <NavigationWrapper>
            <ContentLarge>
                <NavigationInner>
                    <NavigationGroup>
                        <Link href="/teams" passHref>
                            <a>
                                <Logo>
                                    revu<Highlight>.</Highlight>
                                </Logo>
                            </a>
                        </Link>
                        <NavigationList>
                            <Link href="/teams" passHref>
                                <NavigationItem>Teams</NavigationItem>
                            </Link>
                            <NavigationItem as="button" onClick={openFeedback}>
                                Feedback
                            </NavigationItem>
                            <Link href="/support" passHref>
                                <NavigationItem>Support</NavigationItem>
                            </Link>
                        </NavigationList>
                    </NavigationGroup>
                    <NavigationGroup>
                        <NavigationItem
                            as="button"
                            title="Change Color Theme"
                            onClick={toggleTheme}>
                            {theme === "light" ? <IconSun /> : <IconMoon />}
                        </NavigationItem>
                        <Link href="/account" passHref>
                            <NavigationItem>
                                <Avatar photoURL={session?.photoURL} />
                            </NavigationItem>
                        </Link>
                    </NavigationGroup>
                </NavigationInner>
            </ContentLarge>
        </NavigationWrapper>
    );
};
