import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { link } = req.query;

        if (!link || typeof link !== "string") {
            return res.status(400).end();
        }

        const response = await fetch(link);

        const html = await response.text();
        const match = html.match("(?<=<title.*>)(.*)(?=</title>)") || "";
        const title = match[0];

        if (!title) {
            res.status(400).end();
        }

        res.status(200).json({ title });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
