import { db } from '../_lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getUsers = async function () {
  const collectionRef = collection(db, 'users');
  const usersCollectionSnapshot = await getDocs(collectionRef);
  const usersList = usersCollectionSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return usersList;
};
