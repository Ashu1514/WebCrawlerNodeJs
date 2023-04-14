import { firebaseAdmin } from "../toolbox";

export type PagesMapping = {
  [keys: string]: number;
};
/**
 * crawler class
 */
export class Crawler {
  public Ready: Promise<string>;
  /**
   * crawler class
   * @param {string} baseURL base url to crawl on
   * @param {string} starttingPageURL url of starting page
   * @param {string} email firebase admin object
   * @param {number} level firebase admin object
   * @param {Date} createdAt firebase admin object
   * @param {string} taskId carwling query's task id
   */
  constructor(
    public baseURL: string,
    public starttingPageURL: string,
    public email: string,
    public level: number = 5,
    public createdAt = Date.now(),
    public taskId?: string
  ) {
    this.Ready = new Promise((resolve, reject) => {
      this.addCrawlingQuery().then((result) => {
        resolve(result);
      }).catch(reject);
    });
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
      level: this.level,
      createdAt: this.createdAt,
    };
    const firestoreDB = firebaseAdmin.firestore();
    const dbRef = firestoreDB.collection("crawling_queries");
    const task = await dbRef.add(crawlingQuery);
    return task.id;
  }
  /**
   * add Crawling Query Logs async function
   * @param {string} taskId crawling query task id
   * @param {string} logString crawling query log text
   */
  async addCrawlingQueryLog(taskId: string, logString: string) {
    const db = firebaseAdmin.database();
    const ref = db.ref("crawling_query_logs/");
    const taskRef = ref.child(taskId);
    await taskRef.set({
      log: logString,
      createdAt: Date.now(),
    });
  }
}
