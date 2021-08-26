import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { DataContext } from "./DataContext";
import { useRouter } from "next/router";
import { useSession } from "../user/SessionContext";
import { createComment, createInvitation, createReview } from "../../lib/api/create";
import { updateReviewStatus, updateRole, updateTeamName } from "../../lib/api/update";
import { deleteMember, deleteTeam } from "../../lib/api/delete";

export const DataProvider: React.FC = ({ children }) => {
    const router = useRouter();
    const { session } = useSession();
    const { id } = router.query;
    const [team, setTeam] = useState<Data.Team | null>(null);
    const [teamId, setTeamId] = useState<string>("");
    const [teams, setTeams] = useState<Data.Team[] | null>(null);
    const [reviews, setReviews] = useState<Data.Review[] | null>(null);

    useEffect(() => {
        if (!session) {
            return;
        }

        handleTeams();
    }, [session]);

    useEffect(() => {
        if (!id || typeof id !== "string" || !teams) {
            setTeam(null);
            setTeamId("");
            return;
        }

        const match = teams.find(item => item.id === id);

        if (match) {
            setTeam(match);
            setTeamId(match.id);
        }
    }, [id, teams]);

    useEffect(() => {
        if (!teamId) {
            return;
        }

        const unsubscribe = db
            .doc(`teams/${teamId}`)
            .collection("reviews")
            .onSnapshot(snapshot => {
                setReviews(snapshot.docs.map(doc => doc.data() as Data.Review));
            });

        return () => {
            unsubscribe();
            setReviews(null);
        };
    }, [teamId]);

    const handleTeams = async () => {
        if (!session) {
            return;
        }

        db.collection("teams")
            .where(`roles.${session.uid}`, ">", -1)
            .onSnapshot(snapshot => {
                setTeams(snapshot.docs.map(doc => doc.data() as Data.Team));
            });
    };

    const handleName = async (name: string) => {
        if (!team || !session) {
            return;
        }

        return updateTeamName(teamId, name);
    };

    const handleReview = async (value: string) => {
        if (!team) {
            return;
        }

        return createReview(value, team.id);
    };

    const handleState = (value: Data.ReviewStatus, reviewId: string) => {
        if (!team) {
            return;
        }

        updateReviewStatus(value, team.id, reviewId).catch(console.error);
    };

    const handleNewInvitation = async (role: Data.Role): Promise<string | null> => {
        if (!team) {
            return null;
        }

        return await createInvitation(team.id, role);
    };

    const handleInvitation = async () => {
        if (!id || typeof id !== "string" || !session) {
            return;
        }

        const res = await fetch("/api/invite/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uid: session.uid,
                id,
            }),
        });

        if (res.status !== 200) {
            return;
        }

        router.replace("/teams");
    };

    const handleDeleteTeam = async () => {
        if (!team) {
            return;
        }

        await deleteTeam(team.id);

        router.replace("/teams");
    };

    const handleLeaveTeam = async () => {
        if (!team || !session) {
            return;
        }

        await deleteMember(team.id, session.uid);

        router.replace("/teams");
    };

    const handleRole = async (uid: string, role: Data.Role) => {
        if (!team) {
            return;
        }

        return updateRole(teamId, uid, role);
    };

    const handleDeleteMember = async (uid: string) => {
        if (!team) {
            return;
        }

        return deleteMember(team.id, uid);
    };

    const handleComment = async (reviewId: string, message: string) => {
        if (!team || !session) {
            return;
        }

        return createComment(team.id, reviewId, session.uid, message);
    };

    const isOwner = (uid?: string): boolean => {
        if (!team || !session) {
            return false;
        }

        let id: string;

        if (!uid) {
            id = session.uid;
        } else {
            id = uid;
        }

        return !!team.roles[id];
    };

    return (
        <DataContext.Provider
            value={{
                team,
                teams,
                reviews,
                handleName,
                handleReview,
                handleState,
                handleNewInvitation,
                handleInvitation,
                handleDeleteTeam,
                handleDeleteMember,
                handleRole,
                handleLeaveTeam,
                handleComment,
                isOwner,
            }}>
            {children}
        </DataContext.Provider>
    );
};
