import { db } from "../../firebase";

export const updateTeamName = (teamId: string, name: string) => {
    const teamDoc = db.doc(`teams/${teamId}`);
    return teamDoc.update({ name });
};

export const updateReviewStatus = async (
    value: Data.ReviewStatus,
    projectId: string,
    reviewId: string
) => {
    return db
        .doc(`teams/${projectId}/reviews/${reviewId}`)
        .update({ status: value, updatedAt: Date.now() });
};

export const archiveReview = async (reviewId: string, teamId: string) => {
    const teamDoc = db.doc(`teams/${teamId}`);
    const reviewDoc = teamDoc.collection("reviews").doc(reviewId);

    await reviewDoc.update({ archived: true });
    teamDoc.update({ updatedAt: Date.now() });
};

export const updateRole = async (teamId: string, uid: string, role: Data.Role) => {
    const teamDoc = db.doc(`teams/${teamId}`);

    const doc = await teamDoc.get();
    const { roles } = doc.data() as Data.Team;

    return teamDoc.update({ roles: { ...roles, [uid]: role }, updatedAt: Date.now() });
};
