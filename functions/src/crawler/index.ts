import * as express from "express";
import { crawlPage } from "./crawl";
import * as cors from "cors";

const mCrawlerExpress = express();
mCrawlerExpress.use(cors);

/**
 * crawler express initialization function
 * @param {object} cors cors object
 * @param {object} firebaseAdmin firebase admin object
 * @return {object} crawler express object
 */
// function init(cors: any, firebaseAdmin: any) {
//   mCrawlerExpress.use(cors);

mCrawlerExpress.get(
  "/ping",
  async (req: express.Request, res: express.Response) => {
    res.send("pong");
  }
);

mCrawlerExpress.get(
  "/start",
  async (req: express.Request, res: express.Response) => {
    console.log("crawling started");
    //   const body = req.body as {baseUrl: string, currentUrl: string};
    const body = {
      baseUrl: "https://cryptozombies.io",
      currentUrl: "https://cryptozombies.io",
    };
    try {
      console.log(`starting crawl of ${body.baseUrl}`);
      const result = await crawlPage(body.baseUrl, body.currentUrl, {});
      console.log("crawling result:", result);
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(500).send({ message: error.message, error });
    }
  }
);

//   return mCrawlerExpress;
// }
export default mCrawlerExpress;
