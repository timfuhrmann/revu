import React, { useState } from "react";
import styled from "styled-components";
import { Content } from "../../app/css/content";
import { H2 } from "../../app/css/typography";
import { ContactData, SettingsContact } from "../../app/layout/molecule/SettingsContact";
import { createSupportTicket } from "../../app/lib/api/create";
import { useSession } from "../../app/context/user/SessionContext";
import { CONTACT_ERROR, errors, NO_USER } from "../../app/lib/config/errors";
import { useRouter } from "next/router";
import { Meta } from "../../app/lib/Meta";
import { LoginModal } from "../../app/layout/organism/LoginModal";

const PageWrapper = styled.div`
    padding: 10rem 0;
    min-height: calc(100vh - 7.5vh);
`;

const PageHead = styled.div`
    padding: 3rem 0;
    border-top: 0.1rem solid ${p => p.theme.gray200};
    border-bottom: 0.1rem solid ${p => p.theme.gray200};

    @media ${p => p.theme.bp.l} {
        padding: 6rem 0;
    }
`;

const PageContent = styled(Content)`
    padding: 2rem 0 0;

    @media ${p => p.theme.bp.l} {
        padding: 4rem 0 0;
    }
`;

const Support: React.FC = () => {
    const router = useRouter();
    const { session } = useSession();
    const [error, setError] = useState<string>("");

    const handleSubmit = async ({ subject, message }: ContactData) => {
        setError("");

        if (!subject || !message) {
            return;
        }

        if (!session) {
            setError(errors[NO_USER]);
            return;
        }

        createSupportTicket(subject, message, session.uid)
            .then(() => router.push("/teams"))
            .catch(err => {
                console.log(err);
                setError(errors[CONTACT_ERROR]);
            });
    };

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Support - Revu" />
            <PageHead>
                <Content>
                    <H2 as="h1">Support</H2>
                </Content>
            </PageHead>
            <PageContent>
                <SettingsContact
                    title="Describe your problem"
                    error={error}
                    disabled={!session}
                    onSubmit={handleSubmit}
                />
            </PageContent>
        </PageWrapper>
    );
};

export default Support;
