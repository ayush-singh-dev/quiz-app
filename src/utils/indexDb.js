import { openDB } from "idb";

const DB_NAME = "QuizDB";
const DB_VERSION = 1;
const STORE_NAME = "quizHistory";

// Open IndexedDB
const openDatabase = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Save quiz result in IndexedDB
export const saveQuizResult = async (score) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add({ score, date: new Date().toISOString() });
  await tx.done;
};

// Get quiz history from IndexedDB
export const getQuizHistory = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.getAll();
};
