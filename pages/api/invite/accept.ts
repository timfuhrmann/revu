import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../app/lib/firebase/admin";

const invitations = db.collection("invitations");
const teams = db.collection("teams");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, uid } = req.body;

        const invitationRef = invitations.doc(id);

        await db.runTransaction(tx => {
            let role: Data.Role = 0;

            return tx
                .get(invitationRef)
                .then(invitationDoc => {
                    if (!invitationDoc.exists) {
                        return Promise.reject({ status: 400, code: "INVITATION_NOT_FOUND" });
                    }

                    const data = invitationDoc.data() as Data.Invitation;

                    if (data.status === 1) {
                        return Promise.reject({ status: 400, code: "INVITATION_ALREADY_ACCEPTED" });
                    }

                    role = data.role;

                    return Promise.resolve(data);
                })
                .then(invitation => tx.get(teams.doc(invitation.teamId)))
                .then(snapshot => {
                    const team = snapshot.data() as Data.Team;

                    if (team.roles[uid]) {
                        return Promise.reject({ status: 400, code: "ALREADY_MEMBER" });
                    }

                    return Promise.resolve(team);
                })
                .then(team =>
                    tx.update(teams.doc(team.id), {
                        roles: { ...team.roles, [uid]: role },
                        updatedAt: Date.now(),
                    })
                )
                .then(() => tx.update(invitationRef, { status: 1 }));
        });

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json(error);
    }
}
