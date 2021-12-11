import { NextApiHandler } from "next";
import { getAllSitesForUser } from "@lib/db-admin";
import { auth } from "@lib/firebase-admin";

const handler: NextApiHandler = async (req, res) => {
  try {
    const token = req.headers.token as string;
    const { uid } = await auth.verifyIdToken(token);

    const { sites } = await getAllSitesForUser(uid);

    return res.status(200).send({ sites });
  } catch (e) {
    const error = e as Error;
    return res.status(500).send(error);
  }
};

export default handler;
