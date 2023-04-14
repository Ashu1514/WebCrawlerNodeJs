import * as express from "express";
import * as toolbox from "../toolbox";
import { crawlPage } from "./crawl";
import { sortPages } from "./report";
import { Crawler, CrawlerBody } from "./crawler.model";

const mCrawlerExpress = express();

/**
 * crawler express initialization function
 * @param {object} cors cors object
 * @param {object} firebaseAdmin firebase admin object
 * @return {object} crawler express object
 */
// function init(cors: any, firebaseAdmin: any) {
// mCrawlerExpress.use(toolbox.cors);

mCrawlerExpress.get(
  "/ping",
  async (req: express.Request, res: express.Response) => {
    res.send("pong");
  }
);

mCrawlerExpress.post(
  "/start",
  async (req: express.Request, res: express.Response) => {
    console.log("crawling started...");
    const body = req.body as CrawlerBody;
    try {
      const CrawlerQuery = await new Crawler(
        body.baseURL,
        body.starttingPageURL,
        body.email,
        body.maxLevel
      );
      await CrawlerQuery.addCrawlingQuery();
      CrawlerQuery.addCrawlingQueryLog(
        `Crawler query registered at task id: ${CrawlerQuery.taskId}`
      );
      CrawlerQuery.addCrawlingQueryLog(`starting crawl of ${body.baseURL}`);
      const result = await crawlPage(
        body.baseURL,
        body.starttingPageURL,
        {},
        CrawlerQuery
      );
      const sortedResult = sortPages(result);
      CrawlerQuery.addCrawlingQueryLog("Crawling finished!");
      res.status(200).send({ sortedResult });
    } catch (error: any) {
      res.status(500).send({ message: error.message, error });
    }
  }
);

export default mCrawlerExpress;
