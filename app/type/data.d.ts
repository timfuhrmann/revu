declare module Data {
    // 0: pending, 1: approved, 2: warning, 3: denied
    type ReviewStatus = 0 | 1 | 2 | 3;

    // 0: pending, 1: accepted
    type InvitationStatus = 0 | 1;

    // 0: member, 1: owner
    type Role = 0 | 1;

    interface Comment {
        uid: string;
        message: string;
        createdAt: number;
    }

    interface Support {
        id: string;
        uid: string;
        subject: string;
        message: string;
        createdAt: number;
    }

    interface Feedback {
        id: string;
        uid: string;
        message: string;
        emoji: number | null;
        createdAt: number;
    }

    interface Invitation {
        status: InvitationStatus;
        id: string;
        teamId: string;
        role: Role;
    }

    interface Member {
        uid: string;
        role: Role;
    }

    interface Team {
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number;
        roles: Record<string, Data.Role>;
    }

    interface Review {
        id: string;
        link: string;
        status: ReviewStatus;
        comments: Comment[];
        archived?: boolean;
        createdAt: number;
        updatedAt: number;
    }
}
