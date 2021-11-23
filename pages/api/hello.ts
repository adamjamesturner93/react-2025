import { NextApiHandler } from "next";

export const handler: NextApiHandler = (_, res) => {
  res.status(200).json({ name: "John Doe" });
};
