import React, { createContext, useContext } from "react";

interface DataProps {
    team: Data.Team | null;
    teams: Data.Team[] | null;
    reviews: Data.Review[] | null;
    handleName: (name: string) => void;
    handleReview: (value: string) => void;
    handleState: (value: Data.ReviewStatus, reviewId: string) => void;
    handleNewInvitation: (role: Data.Role) => Promise<string | null>;
    handleInvitation: () => void;
    handleDeleteTeam: () => void;
    handleDeleteMember: (uid: string) => void;
    handleRole: (uid: string, role: Data.Role) => void;
    handleLeaveTeam: () => void;
    handleComment: (reviewId: string, message: string) => void;
    isOwner: (uid?: string) => boolean;
}

export const DataContext = createContext<DataProps>({} as DataProps);

export const useData = () => useContext(DataContext);
