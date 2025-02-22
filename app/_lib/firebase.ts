import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  type: process.env.AUTH_FIREBASE_TYPE || '',
  project_id: process.env.AUTH_FIREBASE_PROJECT_ID || '',
  private_key_id: process.env.AUTH_FIREBASE_PRIVATE_KEY_ID || '',
  private_key:
    process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  client_email: process.env.AUTH_FIREBASE_CLIENT_EMAIL || '',
  client_id: process.env.AUTH_FIREBASE_CLIENT_ID || '',
  auth_uri: process.env.AUTH_FIREBASE_AUTH_URI || '',
  token_uri: process.env.AUTH_FIREBASE_TOKEN_URI || '',
  auth_provider_x509_cert_url:
    process.env.AUTH_FIREBASE_AUTH_PROVIDER_CERT_URL || '',
  client_x509_cert_url: process.env.AUTH_FIREBASE_CLIENT_CERT_URL || '',
  universe_domain: process.env.AUTH_FIREBASE_UNIVERSE_DOMAIN,
};

var admin = require('firebase-admin');

const app = !getApps().length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
  : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { db, auth, storage };
