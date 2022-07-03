import { useEffect, useMemo, useState } from "react";
import { statusMap } from "../util";

const STORAGE_FILTER_STATE = "filter-state";

interface FilterData {
    loading: boolean;
    state: Filter.State;
    setState: (state: Filter.State) => void;
    customOrder: string[];
    setCustomOrder: (order: string[]) => void;
    sortedReviews: Data.Review[] | null;
    archivedReviews: Data.Review[] | null;
}

export const useFilter = (reviews: Data.Review[] | null): FilterData => {
    const [state, setState] = useState<Filter.State>(0);
    const [customOrder, setCustomOrder] = useState<string[]>(Object.keys(statusMap));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const value = localStorage.getItem(STORAGE_FILTER_STATE);

        if (value) {
            const storageState = JSON.parse(value) as Filter.StorageState;
            setState(storageState.state);
            setCustomOrder(storageState.customOrder);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        const storageState: Filter.StorageState = {
            state,
            customOrder,
        };

        localStorage.setItem(STORAGE_FILTER_STATE, JSON.stringify(storageState));
    }, [state, customOrder]);

    const sortedReviews = useMemo(() => {
        if (!reviews) {
            return null;
        }

        const filteredReviews = reviews.filter(review => !review.archived);

        switch (state) {
            case 0: {
                return filteredReviews.sort((a, b) => a.createdAt - b.createdAt);
            }
            case 1: {
                return filteredReviews.sort((a, b) => b.createdAt - a.createdAt);
            }
            case 2: {
                const arrays = customOrder.map(status => {
                    return filteredReviews.filter(review => review.status === parseInt(status));
                });

                return Array.prototype.concat.apply([], arrays);
            }
        }
    }, [reviews, state, customOrder]);

    const archivedReviews = useMemo(() => {
        if (!reviews) {
            return null;
        }

        const filteredReviews = reviews.filter(review => review.archived);

        return filteredReviews.sort((a, b) => b.createdAt - a.createdAt);
    }, [reviews]);

    return {
        loading,
        state,
        setState,
        customOrder,
        setCustomOrder,
        sortedReviews,
        archivedReviews,
    };
};
