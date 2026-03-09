// ── src/firebase.js ───────────────────────────────────────────────────────────
// Replace the values below with your own Firebase project config.
// Firebase Console → Project Settings → Your apps → SDK setup and configuration

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId:         "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket:     "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId:             "REPLACE_WITH_YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── Firestore helpers ─────────────────────────────────────────────────────────

// Single shared report document (current working state)
const REPORT_DOC = "noc/current";

export async function loadReport() {
  const snap = await getDoc(doc(db, "noc", "current"));
  return snap.exists() ? snap.data() : null;
}

export async function saveReport(data) {
  await setDoc(doc(db, "noc", "current"), data);
}

// Subscribe to real-time updates of the shared report
export function subscribeReport(callback) {
  return onSnapshot(doc(db, "noc", "current"), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}

// Archives — each snapshot is its own document in noc/archives/{id}
export async function saveArchive(snapshot) {
  await setDoc(doc(db, "noc", "archives", snapshot.id), snapshot);
}

export async function loadArchives() {
  const snap = await getDocs(collection(db, "noc", "archives"));
  return snap.docs.map((d) => d.data());
}

export async function deleteArchive(id) {
  await deleteDoc(doc(db, "noc", "archives", id));
}
