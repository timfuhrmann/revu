import { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../../../app/lib/firebase/providers/twitch";
import { auth } from "../../../../app/lib/firebase/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tokenHost, userHost, client, redirectUri } = config;
    const { code } = req.query;

    if (!code || typeof code !== "string") {
        return res.redirect("/login");
    }

    const url = `${tokenHost}?client_id=${client.id}&client_secret=${client.secret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`;

    try {
        const { access_token } = await fetch(url, { method: "POST" }).then(res => res.json());

        const { data } = await fetch(userHost, {
            headers: { "Client-ID": client.id, Authorization: "Bearer " + access_token },
        }).then(res => res.json());

        const user = data[0];

        if (!user || !user.id) {
            return res.redirect("/login");
        }

        const { id, display_name, email, profile_image_url } = user;

        const uid = "twitch" + id;

        const newUser: Auth.Session = {
            uid,
            displayName: display_name,
            email: email,
            emailVerified: true,
            photoURL: profile_image_url,
        };

        await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/create/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        const token = await auth.createCustomToken(uid);

        res.redirect("/teams?t=" + token);
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
}
