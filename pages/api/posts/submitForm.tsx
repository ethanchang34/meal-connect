import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function submitForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    //Check to see if user is logged in before sending form
    if (!session) {
      return res.status(401).json({ message: "Please sign in to submit form" });
    }

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    const locations = req.body.checked;
    //Check title
    // if (title.length > 300) {
    //   return res.status(403).json({ message: "Please write a shorter post" });
    // }
    // if (!title.length) {
    //   return res
    //     .status(403)
    //     .json({ message: "Please do not leave this empty" });
    // }

    //Submit Form
    try {
      const result = await prisma.form.create({
        data: {
          caesar_rodney: locations["caesar_rodney"],
          pencader: locations["pencader"],
          russell: locations["russell"],
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured whilst submitting form" });
    }
  }
}
