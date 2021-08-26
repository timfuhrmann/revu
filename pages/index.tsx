import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { Opener } from "../app/layout/molecule/Opener";
import { getSession } from "../app/lib/api";
import { Meta } from "../app/lib/Meta";
import { BlockStory } from "../app/layout/atom/BlockStory";

const HomeWrapper = styled.div``;

const Block = styled.div`
    margin-bottom: 12.5rem;
`;

const Home: React.FC = () => {
    return (
        <HomeWrapper>
            <Meta />
            <Block>
                <Opener />
            </Block>
            <Block>
                <BlockStory
                    headline="Your team in realtime"
                    text="Organize your reactions, rate a review and use comments to communicate special cases - all in realtime."
                    sections={[
                        {
                            title: "Organize your reactions",
                            text: "All your reactions organized in one place sorted the way you want it. Never miss a link again.",
                        },
                        {
                            title: "Rate a review",
                            text: "Organize a team of moderators to rate each reaction. Ratings include pending, approved, warning and denied. Never risk watching a video violating TOS again.",
                        },
                        {
                            title: "Add comment to review",
                            text: "To improve teamwork each review takes comments. Get a second opinion by telling your team about a potential violation.",
                        },
                    ]}
                />
            </Block>
        </HomeWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession(req);

    if (session) {
        return {
            redirect: {
                destination: "/teams",
                permanent: false,
            },
        };
    }

    return {
        props: { isLandingPage: true },
    };
};

export default Home;
