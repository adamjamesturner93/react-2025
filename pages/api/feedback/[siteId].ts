import { NextApiHandler } from "next";
import { getAllFeedback } from "@lib/db-admin";

const handler: NextApiHandler = async (req, res) => {
  const siteId = req.query["siteId"] as string;
  if (!siteId) {
    return res.status(404).send("uh oh");
  }
  const { feedback, error } = await getAllFeedback(siteId);
  if (error) return res.status(500).send(error);
  res.status(200).json({ feedback });
};

export default handler;
