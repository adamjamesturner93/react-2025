// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";

export const handler: NextApiHandler = (req, res) => {
  console.log(req);
  res.status(200).json({ name: "John Doe" });
};
