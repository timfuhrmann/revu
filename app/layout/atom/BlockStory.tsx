import React from "react";
import styled from "styled-components";
import { Content, ContentLarge } from "../../css/content";
import { FlowText, H2, H3, SmallText } from "../../css/typography";
import { ReviewDemo } from "../organism/ReviewDemo";

const StoryWrapper = styled.div``;

const StoryHead = styled.div`
    text-align: center;
    margin-bottom: 4rem;
`;

const StoryContent = styled.div`
    @media ${p => p.theme.bp.xl} {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const ImageWrapper = styled.div`
    flex: 1;
    pointer-events: none;
`;

const StoryHeadline = styled(H2)`
    margin-bottom: 0.5rem;

    @media ${p => p.theme.bp.l} {
        margin-bottom: 1rem;
    }
`;

const StoryTitle = styled(H3)`
    margin-bottom: 0.5rem;

    @media ${p => p.theme.bp.l} {
        margin-bottom: 1rem;
    }
`;

const StorySections = styled.div`
    text-align: center;
    margin-bottom: 4rem;

    @media ${p => p.theme.bp.l} {
        display: flex;
        gap: 5rem;
        text-align: center;
        margin-bottom: 2rem;
    }

    @media ${p => p.theme.bp.xl} {
        display: block;
        max-width: 30%;
        margin-right: 10rem;
        margin-bottom: 0;
        text-align: left;
    }
`;

const StorySection = styled.div`
    max-width: 30rem;
    margin: 0 auto 3rem;

    &:last-child {
        margin-bottom: 0;
    }

    @media ${p => p.theme.bp.l} {
        margin: 0 0 3rem;
        max-width: 33.33%;
    }

    @media ${p => p.theme.bp.xl} {
        max-width: none;
    }
`;

const ReviewWrapper = styled.div`
    width: 100%;
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

interface Section {
    title: string;
    text: string;
}

interface BlockStoryProps {
    headline: string;
    text: string;
    sections: Section[];
}

export const BlockStory: React.FC<BlockStoryProps> = ({ headline, text, sections }) => {
    return (
        <StoryWrapper>
            <ContentLarge>
                <StoryHead>
                    <Content>
                        <StoryHeadline>{headline}</StoryHeadline>
                        <FlowText>{text}</FlowText>
                    </Content>
                </StoryHead>
                <StoryContent>
                    <StorySections>
                        {sections.map((section, index) => (
                            <StorySection key={index}>
                                <StoryTitle>{section.title}</StoryTitle>
                                <SmallText>{section.text}</SmallText>
                            </StorySection>
                        ))}
                    </StorySections>
                    <ImageWrapper>
                        <ReviewWrapper>
                            <ReviewDemo
                                forceExpanded={false}
                                initialReview={{
                                    id: "1234",
                                    link: "",
                                    status: 1,
                                    comments: [],
                                    createdAt: Date.now(),
                                    updatedAt: Date.now(),
                                }}
                            />
                        </ReviewWrapper>
                        <ReviewWrapper>
                            <ReviewDemo
                                forceExpanded
                                initialReview={{
                                    id: "1234",
                                    link: "",
                                    status: 2,
                                    comments: [
                                        {
                                            createdAt: Date.now(),
                                            message: "TOS from 1:30 to 1:35 - watch out!",
                                            uid: "",
                                        },
                                    ],
                                    createdAt: Date.now(),
                                    updatedAt: Date.now(),
                                }}
                            />
                        </ReviewWrapper>
                    </ImageWrapper>
                </StoryContent>
            </ContentLarge>
        </StoryWrapper>
    );
};
