import { db } from '../_lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { error } from 'console';
import { notFound } from 'next/navigation';

export const getUsers = async function () {
  const collectionRef = collection(db, 'users');

  try {
    const usersCollectionSnapshot = await getDocs(collectionRef);
    const usersList = usersCollectionSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return usersList;
  } catch {
    throw new Error('Customers could not be loaded');
  }
};

export const getUser = async function (id: any) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();

  if (error) {
    console.error(error);
    notFound();
  }
};
