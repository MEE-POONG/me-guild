import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || "");
    const session = cookies.session ? JSON.parse(cookies.session) : null;

    if (!session) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    return res.status(200).json({ success: true, user: session });
}
