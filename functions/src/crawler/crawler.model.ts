import { firebaseAdmin } from "../toolbox";
import { PagesMapping } from "../typings/crawler";

export interface CrawlerBody {
  baseURL: string;
  starttingPageURL: string;
  maxLevel: number;
  createdAt: number;
  email?: string;
  taskId?: string;
}

export enum LogType {
  QUERY_CREATED,
  CRAWLING,
  LEVEL,
  MESSAGE,
  ERROR,
}

/**
 * crawler class
 */
export class Crawler implements CrawlerBody {
  taskId: string;
  createdAt: number;
  /**
   * crawler class
   * @param {string} baseURL base url to crawl on
   * @param {string} starttingPageURL url of starting page
   * @param {string} email firebase admin object
   * @param {number} maxLevel firebase admin object
   * @param {string} id temp carwling query's task id
   * @param {Date} createdAt firebase admin object
   * @param {string} taskId carwling query's task id
   */
  constructor(
    public baseURL: string,
    public starttingPageURL: string,
    public email: string = "",
    public maxLevel: number = 10,
    id?: string
  ) {
    this.taskId = id ?? "dummy";
    this.createdAt = Date.now();
  }

  /**
   * add Crawling Query Logs async function
   * @return {string} task id
   */
  async addCrawlingQuery() {
    const crawlingQuery = {
      baseURL: this.baseURL,
      starttingPageURL: this.starttingPageURL,
      email: this.email,
      maxLevel: this.maxLevel,
      createdAt: this.createdAt,
      taskId: this.taskId,
      updatedAt: this.createdAt,
    };
    const firestoreDB = firebaseAdmin.firestore();
    const dbRef = firestoreDB.collection("crawling_queries");
    const existedQuery = await dbRef
      .where("baseURL", "==", this.baseURL)
      .where("starttingPageURL", "==", this.starttingPageURL)
      .where("email", "==", this.email)
      .where("maxLevel", "==", this.maxLevel)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    if (existedQuery.docs[0]) {
      this.taskId = existedQuery.docs[0].id;
      const db = firebaseAdmin.database();
      const ref = db.ref("crawling_query_logs/");
      const taskRef = ref.child(this.taskId);
      await taskRef.remove();
      await existedQuery.docs[0].ref.update({ updatedAt: Date.now() });
    } else {
      const task = await dbRef.add(crawlingQuery);
      this.taskId = task.id;
      await task.update({ taskId: this.taskId });
    }
    console.log("task id is: " + this.taskId);
  }

  /**
   * add Crawling Query Logs async function
   * @param {PagesMapping} result result mapping object
   * @return {string} task id
   */
  async updateQueryResult(result: PagesMapping) {
    const firestoreDB = firebaseAdmin.firestore();
    const taskRef = firestoreDB.collection("crawling_queries").doc(this.taskId);
    await taskRef.update({ result });
  }

  /**
   * add Crawling Query Logs async function
   * @param {string} logString crawling query log text
   * @param {LogType} type crawling query log type
   * @param {any} data crawling query aditional data
   */
  async addCrawlingQueryLog(logString: string, type: LogType, data: any) {
    console.log(logString);
    const db = firebaseAdmin.database();
    const ref = db.ref("crawling_query_logs/");
    const taskID = this.taskId;
    const taskRef = ref.child(taskID).push();
    await taskRef.set({
      log: logString,
      type,
      data,
      createdAt: Date.now(),
    });
  }
}
