import { deleteCache } from 'next/dist/server/lib/render-server';
import { db } from '../_lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const getUsers = async function () {
  const collectionRef = collection(db, 'users');
  const usersCollectionSnapshot = await getDocs(collectionRef);
  const usersList = usersCollectionSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return usersList;
};

export const getUser = async function (id: any) {
  let user = null;
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();
};
