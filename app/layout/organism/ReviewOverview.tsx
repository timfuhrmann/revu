import React from "react";
import styled from "styled-components";
import { Review, ReviewSkeleton } from "./Review";
import { useData } from "../../context/data/DataContext";
import { H4 } from "../../css/typography";
import { archiveReview } from "../../lib/api/update";
import { deleteReview } from "../../lib/api/delete";

const OverviewWrapper = styled.div``;

const ReviewWrapper = styled.div`
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ReviewsEmpty = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
    color: ${p => p.theme.gray600};
    margin: 1rem 0;
`;

const ReviewList = styled.div``;

const ReviewGroup = styled.div`
    margin-bottom: 3rem;

    &:last-child {
        margin: 0;
    }
`;

const ListHead = styled.div`
    margin-bottom: 1rem;
`;

interface ReviewOverviewProps {
    reviews: Data.Review[] | null;
    archivedReviews: Data.Review[] | null;
    loading?: boolean;
}

export const ReviewOverview: React.FC<ReviewOverviewProps> = ({
    reviews,
    archivedReviews,
    loading,
}) => {
    const { team, handleState, handleComment } = useData();

    const handleArchive = (review: Data.Review) => {
        if (!team || review.archived) {
            return;
        }

        archiveReview(review.id, team.id);
    };

    const handleDelete = (review: Data.Review) => {
        if (!team) {
            return;
        }

        deleteReview(review.id, team.id);
    };

    return (
        <OverviewWrapper>
            {!loading && reviews ? (
                <ReviewList>
                    {reviews.length > 0 ? (
                        <ReviewGroup>
                            {reviews.map(review => (
                                <ReviewWrapper key={review.id}>
                                    <Review
                                        {...review}
                                        onSelect={value => handleState(value, review.id)}
                                        onComment={msg => handleComment(review.id, msg)}
                                        onArchive={() => handleArchive(review)}
                                        onDelete={() => handleDelete(review)}
                                    />
                                </ReviewWrapper>
                            ))}
                        </ReviewGroup>
                    ) : (
                        <ReviewsEmpty>No active reviews found</ReviewsEmpty>
                    )}
                    {archivedReviews && archivedReviews.length > 0 && (
                        <ReviewGroup>
                            <ListHead>
                                <H4>Archive</H4>
                            </ListHead>
                            {archivedReviews.map(review => (
                                <ReviewWrapper key={review.id}>
                                    <Review
                                        {...review}
                                        onSelect={value => handleState(value, review.id)}
                                        onComment={msg => handleComment(review.id, msg)}
                                        onArchive={() => handleArchive(review)}
                                        onDelete={() => handleDelete(review)}
                                    />
                                </ReviewWrapper>
                            ))}
                        </ReviewGroup>
                    )}
                </ReviewList>
            ) : (
                [...Array(4)].map((item, index) => (
                    <ReviewWrapper key={index}>
                        <ReviewSkeleton />
                    </ReviewWrapper>
                ))
            )}
        </OverviewWrapper>
    );
};
