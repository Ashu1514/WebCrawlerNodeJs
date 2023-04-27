import { WriteResult } from "firebase-admin/firestore";
import { firebaseAdmin } from "../toolbox";

export const routineCleanUp = async () => {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() - 1);
  const deletingTasks: Promise<WriteResult | void>[] = [];
  const firestoreDB = firebaseAdmin.firestore();
  const firestoreRef = firestoreDB.collection("crawling_queries");
  const db = firebaseAdmin.database();
  const ref = db.ref("crawling_query_logs/");
  const unwantendEntries = await firestoreRef
    .where("email", "==", "")
    .where("createdAt", "<", currentTime.getTime())
    .get();
  unwantendEntries.forEach((task) => {
    console.log("deleteing task : ", task.data());
    deletingTasks.push(firestoreRef.doc(task.id).delete());
  });
  unwantendEntries.forEach((task) => {
    console.log("deleteing task : ", task.data());
    const taskRef = ref.child(task.id);
    deletingTasks.push(taskRef.remove());
    deletingTasks.push(firestoreRef.doc(task.id).delete());
  });
  //   await Promise.all(deletingTasks);
  let failed = 0;
  await Promise.all(deletingTasks.map((p) => p.catch((error) => error)))
    .catch(() => {
      failed++;
      console.log("cleanup failed!", failed);
    });
  console.log(`Report: Failed ${failed} clean ups.`);
  return;
};
