import { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../../app/lib/firebase/providers/twitch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { client, host, redirectUri, scope } = config;
    const redirect = `${host}?client_id=${client.id}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    res.redirect(redirect);
}
