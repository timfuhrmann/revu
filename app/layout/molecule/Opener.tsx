import React, { useRef } from "react";
import styled from "styled-components";
import { FlowText, H1 } from "../../css/typography";
import { Content } from "../../css/content";
import { Button } from "../atom/Button";

const OpenerWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: 55rem;

    @media ${p => p.theme.bp.l} {
        min-height: 70rem;
        align-items: center;
        height: 100vh;
    }
`;

const OpenerInner = styled.div`
    text-align: center;
`;

const OpenerText = styled(FlowText)`
    margin-top: 4rem;
`;

const OpenerControls = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
`;

const SecondaryButtonWrapper = styled.div`
    margin-left: 2rem;
`;

export const Opener: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        if (!wrapperRef.current) {
            return;
        }

        scroll({
            top: wrapperRef.current.getBoundingClientRect().bottom,
            behavior: "smooth",
        });
    };

    return (
        <OpenerWrapper ref={wrapperRef}>
            <OpenerInner>
                <H1>Dodge</H1>
                <H1>Your</H1>
                <H1>Strikes.</H1>
                <Content>
                    <OpenerText>
                        Say no to strikes. Don’t take the risk and organize your team to review and
                        rate videos or other links in advance - for free.
                    </OpenerText>
                    <OpenerControls>
                        <Button action="/signup">Getting Started</Button>
                        <SecondaryButtonWrapper>
                            <Button isSecondary action={handleClick}>
                                More info
                            </Button>
                        </SecondaryButtonWrapper>
                    </OpenerControls>
                </Content>
            </OpenerInner>
        </OpenerWrapper>
    );
};
