import { firebaseAdmin } from "../toolbox";

export interface CrawlerBody {
  baseURL: string;
  starttingPageURL: string;
  maxLevel: number;
  createdAt: number;
  email?: string;
  taskId?: string;
}
/**
 * crawler class
 */
export class Crawler implements CrawlerBody {
  taskId?: string;
  createdAt: number;
  /**
   * crawler class
   * @param {string} baseURL base url to crawl on
   * @param {string} starttingPageURL url of starting page
   * @param {string} email firebase admin object
   * @param {number} maxLevel firebase admin object
   * @param {Date} createdAt firebase admin object
   * @param {string} taskId carwling query's task id
   */
  constructor(
    public baseURL: string,
    public starttingPageURL: string,
    public email: string = "",
    public maxLevel: number = 10
  ) {
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
    };
    const firestoreDB = firebaseAdmin.firestore();
    const dbRef = firestoreDB.collection("crawling_queries");
    const task = await dbRef.add(crawlingQuery);
    this.taskId = task.id;
    console.log("task id is: " + task.id);
  }
  /**
   * add Crawling Query Logs async function
   * @param {string} logString crawling query log text
   */
  async addCrawlingQueryLog(logString: string) {
    console.log(logString);
    const db = firebaseAdmin.database();
    const ref = db.ref("crawling_query_logs/");
    const taskID = this.taskId! as string;
    const taskRef = ref.child(taskID).push();
    // const logId = taskRef.key! as string;
    // const taskRef = taskRef.child(logId);
    await taskRef.set({
      log: logString,
      createdAt: Date.now(),
    });
  }
}
