import { NextApiHandler } from "next";
import db from "@lib/firebase-admin";

const handler: NextApiHandler = async (_, res) => {
  try {
    const snapshot = await db.collection("sites").get();
    const sites = snapshot.docs.map((snap) => ({
      id: snap.id,
      ...snap.data(),
    }));

    console.log(sites);

    return res.status(200).send({ sites });
  } catch (err) {
    const error = err as Error;
    return res.status(500).send(error);
  }
};

export default handler;
