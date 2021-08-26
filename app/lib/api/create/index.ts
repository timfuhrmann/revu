import { db } from "../../firebase";

export const createReview = async (link: string, teamId: string) => {
    try {
        const url = new URL(link);
        const teamDoc = db.doc(`teams/${teamId}`);
        const reviewDoc = teamDoc.collection("reviews").doc();

        const review: Data.Review = {
            id: reviewDoc.id,
            status: 0,
            comments: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            link: url.href,
        };

        await reviewDoc.set(review);
        teamDoc.update({ updatedAt: Date.now() });
    } catch (error) {
        console.log(error);
    }
};

export const createTeam = async (name: string, uid: string) => {
    const teamDoc = db.collection("teams").doc();

    const team: Data.Team = {
        id: teamDoc.id,
        name: name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        roles: {
            [uid]: 1,
        },
    };

    await teamDoc.set(team);

    return teamDoc.id;
};

export const createInvitation = async (teamId: string, role: Data.Role): Promise<string> => {
    const doc = db.collection("invitations").doc();

    const invitation: Data.Invitation = { id: doc.id, status: 0, teamId: teamId, role };

    await doc.set(invitation);

    return doc.id;
};

export const createFeedback = async (message: string, emoji: number | null, uid: string) => {
    const doc = db.collection("feedback").doc();

    const feedback: Data.Feedback = {
        id: doc.id,
        uid,
        message,
        emoji,
        createdAt: Date.now(),
    };

    return doc.set(feedback);
};

export const createSupportTicket = async (subject: string, message: string, uid: string) => {
    const doc = db.collection("support").doc();

    const support: Data.Support = {
        id: doc.id,
        uid,
        message,
        subject,
        createdAt: Date.now(),
    };

    return doc.set(support);
};

export const createComment = async (
    teamId: string,
    reviewId: string,
    uid: string,
    message: string
) => {
    const reviewDoc = db.doc(`teams/${teamId}/reviews/${reviewId}`);

    const doc = await reviewDoc.get();
    const review = doc.data() as Data.Review;
    const comments = review.comments || [];

    const comment: Data.Comment = {
        uid,
        message,
        createdAt: Date.now(),
    };

    return reviewDoc.update({ comments: [...comments, comment] });
};
