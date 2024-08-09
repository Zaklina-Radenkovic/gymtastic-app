import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAmOzCdXTTGtSIBcylsPC9Ch1QLpIeXMcg',
  authDomain: 'gymtastic-app-bb927.firebaseapp.com',
  projectId: 'gymtastic-app-bb927',
  storageBucket: 'gymtastic-app-bb927.appspot.com',
  messagingSenderId: '1056395414497',
  appId: '1:1056395414497:web:bc510396fd425d097aa0a0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
