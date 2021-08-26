import { db } from "../../firebase";
import { removeFromObjectByKey } from "../../util";

export const deleteReview = async (reviewId: string, teamId: string) => {
    const teamDoc = db.doc(`teams/${teamId}`);
    const reviewDoc = teamDoc.collection("reviews").doc(reviewId);

    await reviewDoc.delete();
    teamDoc.update({ updatedAt: Date.now() });
};

export const deleteMember = async (teamId: string, uid: string) => {
    const teamDoc = db.doc(`teams/${teamId}`);

    const doc = await teamDoc.get();
    const { roles } = doc.data() as Data.Team;

    return teamDoc.update({
        roles: removeFromObjectByKey(roles, uid),
        updatedAt: Date.now(),
    });
};

export const deleteTeam = async (teamId: string) => {
    //@todo Delete all sub collections
    return db.doc(`teams/${teamId}`).delete();
};

export const deleteAccount = async () => {
    return fetch("/api/delete/account");
};
