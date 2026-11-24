import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config dari environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inisialisasi Firebase dengan aman (tidak crash di server-side render)
let app = null;
let auth = null;
let db = null;
let googleProvider = null;

try {
  if (typeof window !== "undefined" || process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  }
} catch (err) {
  console.error("Firebase initialization error:", err);
}

export { app, auth, db, googleProvider };

export const loginWithGoogle = async () => {
  if (!auth || !googleProvider) throw new Error("Firebase not initialized");
  const { signInWithPopup } = await import("firebase/auth");
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logout = async () => {
  if (!auth) throw new Error("Firebase not initialized");
  const { signOut } = await import("firebase/auth");
  await signOut(auth);
};
