import admin from "firebase-admin";

function getPrivateKey() {
  const key = process.env.FIREBASE_PRIVATE_KEY || "";
  // Remove surrounding quotes if present (common .env parsing issue)
  const stripped = key.trim().replace(/^"([\s\S]*)"$/, "$1");
  // Convert literal \n to actual newlines
  return stripped.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: getPrivateKey(),
      }),
    });
  } catch (err) {
    console.error("Firebase Admin initialization error:", err.message);
  }
}

export { admin };
