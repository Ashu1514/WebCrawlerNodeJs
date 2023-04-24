import * as express from "express";
import * as toolbox from "../toolbox";
import { crawlPage } from "./crawl";
// import { sortPages } from "./report";
import { Crawler, CrawlerBody, LogType } from "./crawler.model";
import { sortPages } from "./report";

const mCrawlerExpress = express();
mCrawlerExpress.use(toolbox.cors);

mCrawlerExpress.get(
  "/ping",
  async (req: express.Request, res: express.Response) => {
    res.send("pong");
  }
);

mCrawlerExpress.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    const body = req.body as CrawlerBody;
    try {
      const CrawlerQuery = await new Crawler(
        body.baseURL,
        body.starttingPageURL,
        body.email,
        body.maxLevel
      );
      await CrawlerQuery.addCrawlingQuery();
      res.status(200).send(CrawlerQuery);
    } catch (error: any) {
      res.status(500).send({ message: error.message, error });
    }
  }
);

mCrawlerExpress.post(
  "/start",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("crawling started...");
      const body = req.body as {taskId: string};
      const docRef = await toolbox.firebaseAdmin
        .firestore()
        .collection("crawling_queries")
        .doc(body.taskId).get();
      const doc = docRef.data() as CrawlerBody;

      const CrawlerQuery = new Crawler(
        doc.baseURL,
        doc.starttingPageURL,
        doc.email,
        doc.maxLevel,
        doc.taskId
      );
      console.log("CrawlerQuery", CrawlerQuery);
      CrawlerQuery.addCrawlingQueryLog(
        `starting crawl of ${CrawlerQuery.taskId} at base URL: ${doc.baseURL}`,
        LogType.MESSAGE,
        {
          taskId: CrawlerQuery.taskId,
          baseURL: doc.baseURL,
        }
      );
      const result = await crawlPage(
        doc.baseURL,
        doc.starttingPageURL,
        {},
        CrawlerQuery
      );
      const sortedResult = sortPages(result);
      console.log({ result, sortedResult });
      CrawlerQuery.addCrawlingQueryLog("Crawling finished!", LogType.MESSAGE, {
        result: sortedResult,
      });
      res.status(200).send({ sortedResult });
    } catch (error: any) {
      console.log({ error });
      res.status(500).send({ message: error.message, error });
    }
  }
);

export default mCrawlerExpress;
