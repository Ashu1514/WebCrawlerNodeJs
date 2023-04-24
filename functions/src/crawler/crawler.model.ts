import { firebaseAdmin } from "../toolbox";

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
    };
    const firestoreDB = firebaseAdmin.firestore();
    const dbRef = firestoreDB.collection("crawling_queries");
    const task = await dbRef.add(crawlingQuery);
    this.taskId = task.id;
    await dbRef.doc(this.taskId).update({ taskId: this.taskId });
    console.log("task id is: " + task.id);
  }

  /**
   * add Crawling Query Logs async function
   * @param {string} logString crawling query log text
   * @param {LogType} type crawling query log type
   * @param {object} data crawling query aditional data
   */
  // async addCrawlingQueryLog(logString: string, type: LogType, data: object) {
  //   console.log(logString);
  //   const logId = String(Math.random()).replace(".", "");
  //   const db = firebaseAdmin.database();
  //   const ref = db.ref("crawling_query_logs/");
  //   const taskID = this.taskId;
  //   const taskRef = ref
  //     .child(taskID)
  //     .child("logs")
  //     .child(logId);
  //   await taskRef.set({
  //     log: logString,
  //     type,
  //     data,
  //     createdAt: Date.now(),
  //   });
  // }

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

    // console.log(logString);
    // const taskID = this.taskId;
    // const firestoreDB = firebaseAdmin.firestore();
    // const dbRef = firestoreDB
    //   .collection("crawling_queries")
    //   .doc(taskID)
    //   .collection("logs");
    // console.log({ data });
    // await dbRef.add({
    //   log: logString,
    //   type,
    //   data,
    //   createdAt: Date.now(),
    // });
  }
}
