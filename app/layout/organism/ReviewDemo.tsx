import React from "react";
import { Review } from "./Review";

interface ReviewDemoProps {
    initialReview: Data.Review;
    forceExpanded?: boolean;
}

export const ReviewDemo: React.FC<ReviewDemoProps> = ({ initialReview, forceExpanded }) => {
    const placeholder = () => null;

    return (
        <Review
            {...initialReview}
            onArchive={placeholder}
            onDelete={placeholder}
            onComment={placeholder}
            onSelect={placeholder}
            forceExpanded={forceExpanded}
            isDemo
        />
    );
};
