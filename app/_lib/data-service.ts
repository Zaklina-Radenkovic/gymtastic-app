import { db } from '../_lib/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  limit,
  query,
  startAfter,
  orderBy,
  where,
  or,
  and,
  getCountFromServer,
  endBefore,
  limitToLast,
} from 'firebase/firestore';
import { error } from 'console';
import { notFound } from 'next/navigation';
import { PAGE_SIZE } from '../_utils/constants';

interface User {
  fullName: unknown;
  id: string;
  // other fields
}

export const getUsers = async function (
  page = 1,
  term?: string,
  sortOrder: 'asc' | 'desc' = 'asc',
): Promise<{ usersList: User[]; count: number }> {
  const collectionRef = collection(db, 'users');
  let usersList: User[] = [];
  let count = 0;

  try {
    // Build query constraints
    let baseQuery = query(collectionRef, orderBy('fullName', sortOrder));

    // Add filtering constraints if a search term is provided
    if (term) {
      const formattedTerm = term.charAt(0).toUpperCase() + term.slice(1);
      const upperCaseQuery = query(
        baseQuery,
        where('fullName', '>=', formattedTerm),
        where('fullName', '<=', formattedTerm + '\uf8ff'),
      );

      const lowerCaseQuery = query(
        baseQuery,
        where('fullName', '>=', term.toLowerCase()),
        where('fullName', '<=', term.toLowerCase() + '\uf8ff'),
      );

      // Fetch counts for both queries
      const [upperCaseCountSnapshot, lowerCaseCountSnapshot] =
        await Promise.all([
          getCountFromServer(upperCaseQuery),
          getCountFromServer(lowerCaseQuery),
        ]);

      const upperCaseCount = upperCaseCountSnapshot.data().count;
      const lowerCaseCount = lowerCaseCountSnapshot.data().count;

      // Calculate unique count if necessary, but generally sum up
      count = upperCaseCount + lowerCaseCount; // Adjust logic as needed

      // Merge results from both queries
      const [upperCaseSnapshot, lowerCaseSnapshot] = await Promise.all([
        getDocs(upperCaseQuery),
        getDocs(lowerCaseQuery),
      ]);

      const upperCaseList: User[] = upperCaseSnapshot.docs.map((doc) => ({
        ...(doc.data() as User),
        id: doc.id,
      }));

      const lowerCaseList: User[] = lowerCaseSnapshot.docs.map((doc) => ({
        ...(doc.data() as User),
        id: doc.id,
      }));

      const uniqueUsers: { [id: string]: User } = {};
      [...upperCaseList, ...lowerCaseList].forEach((user) => {
        uniqueUsers[user.id] = user;
      });

      usersList = Object.values(uniqueUsers);

      //Handle pagination
      // if (page > 1) {
      if (page > 1 && usersList.length >= (page - 1) * PAGE_SIZE) {
        const lastIndex = (page - 1) * PAGE_SIZE - 1;
        const lastUser = usersList[lastIndex]; // Correct index to get the last user of the previous page

        if (lastUser) {
          const paginatedQuery = query(
            upperCaseQuery, // or lowerCaseQuery, since we only use ordering and limits
            startAfter(lastUser.fullName), // Use lastUser's fullName for pagination
            limit(PAGE_SIZE),
          );
        }
      }
    } else {
      // Count query without filters
      const countSnapshot = await getCountFromServer(query(collectionRef));
      count = countSnapshot.data().count;

      // Fetch documents
      baseQuery = query(baseQuery, limit(PAGE_SIZE));
      if (page > 1) {
        // Fetch documents up to the previous page to determine the start point
        const prevSnapshot = await getDocs(
          query(
            collectionRef,
            orderBy('fullName', sortOrder),
            limit((page - 1) * PAGE_SIZE),
          ),
        );
        const lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1];

        if (lastVisible) {
          console.log(`Last document on page ${page - 1}:`, lastVisible.data());
          baseQuery = query(
            baseQuery,
            startAfter(lastVisible),
            limit(PAGE_SIZE),
          );
        }
      }

      const usersCollectionSnapshot = await getDocs(baseQuery);
      usersList = usersCollectionSnapshot.docs.map((doc) => ({
        ...(doc.data() as User),
        id: doc.id,
      }));
    }

    console.log(count, 'on server');
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return { usersList, count };
};

//// GET USER/////
export const getUser = async function (id: any) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();

  if (error) {
    console.error(error);
    notFound();
  }
};
