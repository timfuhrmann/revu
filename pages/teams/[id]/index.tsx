import React, { useState } from "react";
import styled from "styled-components";
import { Content } from "../../../app/css/content";
import { InputButton } from "../../../app/layout/molecule/InputButton";
import { useData } from "../../../app/context/data/DataContext";
import { ButtonFrame } from "../../../app/layout/atom/ButtonFrame";
import { ReviewOverview } from "../../../app/layout/organism/ReviewOverview";
import { Gear } from "../../../app/icon/Gear";
import { StickyHead } from "../../../app/layout/atom/StickyHead";
import { Filter } from "../../../app/icon/Filter";
import { ReviewsFilter } from "../../../app/layout/molecule/ReviewsFilter";
import { useFilter } from "../../../app/lib/hook/useFilter";
import { Close } from "../../../app/icon/Close";
import { Meta } from "../../../app/lib/meta";
import { LoginModal } from "../../../app/layout/organism/LoginModal";

const PageWrapper = styled.div`
    min-height: calc(100vh - 7.5vh);
`;

const PageContent = styled.div`
    padding: 2.5rem 0;
`;

const PageControls = styled.div`
    @media ${p => p.theme.bp.l} {
        display: flex;
    }
`;

const InputButtonWrapper = styled.div`
    flex: 1;
`;

const ControlsWrapper = styled.div`
    display: inline-block;
    margin: 1.5rem 1.5rem 0 0;

    @media ${p => p.theme.bp.l} {
        margin: 0 0 0 1.5rem;
    }
`;

const SettingsIcon = styled(Gear)`
    width: 2.2rem;
    height: 2.2rem;
`;

const FilterIcon = styled(Filter)`
    width: 2.2rem;
    height: 2.2rem;
`;

const CloseIcon = styled(Close)`
    width: 2.2rem;
    height: 2.2rem;
`;

const FilterWrapper = styled.div`
    margin-top: 2.5rem;
`;

const Team: React.FC = () => {
    const [filterActive, setFilterActive] = useState<boolean>(false);
    const { team, reviews, handleReview } = useData();
    const {
        loading: filterLoading,
        state,
        customOrder,
        setState,
        setCustomOrder,
        sortedReviews,
        archivedReviews,
    } = useFilter(reviews);

    return (
        <PageWrapper>
            <LoginModal />
            <Meta title="Reviews - Revu" />
            <StickyHead title="Reviews">
                <PageControls>
                    <InputButtonWrapper>
                        <InputButton
                            name="review"
                            placeholder="Link to review..."
                            button="Add review"
                            onSubmit={handleReview}
                            clearOnSubmit
                        />
                    </InputButtonWrapper>
                    <ControlsWrapper>
                        <ButtonFrame
                            active={filterActive}
                            action={() => setFilterActive(prevState => !prevState)}
                            title="Settings">
                            {filterActive ? <CloseIcon /> : <FilterIcon />}
                        </ButtonFrame>
                    </ControlsWrapper>
                    <ControlsWrapper>
                        <ButtonFrame action={`/settings/${team?.id}`} title="Settings">
                            <SettingsIcon />
                        </ButtonFrame>
                    </ControlsWrapper>
                </PageControls>
                {filterActive && (
                    <FilterWrapper>
                        <ReviewsFilter
                            state={state}
                            customOrder={customOrder}
                            setState={setState}
                            setCustomOrder={setCustomOrder}
                        />
                    </FilterWrapper>
                )}
            </StickyHead>
            <PageContent>
                <Content>
                    <ReviewOverview
                        reviews={sortedReviews}
                        archivedReviews={archivedReviews}
                        loading={filterLoading || !sortedReviews}
                    />
                </Content>
            </PageContent>
        </PageWrapper>
    );
};

export default Team;
