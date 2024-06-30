import { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/lib/contentful";
import requestIp from "request-ip";
import { LimitChecker } from "@/lib/limitChecker";

const limitChecker = LimitChecker();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req.query;
    const clientIp = requestIp.getClientIp(req) || 'IP_NOT_FOUND'
    try {
      await limitChecker.check(res, 40, clientIp)
    } catch (error) {
      console.log(error)
      return res.status(429).json({
        text: `Rate Limited`,
        clientIp: clientIp,
      })
    }
    const data = await contentfulClient.getEntries({
      content_type: "news",
      query: query.toString(),
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
