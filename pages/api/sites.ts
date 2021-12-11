import { NextApiHandler } from "next";
import { getAllSites } from "@lib/db-admin";

const handler: NextApiHandler = async (_, res) => {
  const { sites, error } = await getAllSites();
  if (error) return res.status(500).send(error);
  return res.status(200).send({ sites });
};

export default handler;
