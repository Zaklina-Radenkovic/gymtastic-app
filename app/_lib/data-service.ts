import { getFirestore } from 'firebase-admin/firestore';
import { db } from './firebase';
import { error } from 'console';
import { notFound } from 'next/navigation';
import { PAGE_SIZE } from '../_utils/constants';

interface User {
  timestamp(
    fullName: unknown,
    timestamp: Date,
  ): import('@firebase/firestore').QueryConstraint;
  fullName: unknown;
  id: string;
}

export const getUsers = async function (
  page = 1,
  term?: string,
  sortBy: 'fullName' | 'timestamp' = 'fullName',
  sortOrder: 'asc' | 'desc' = 'asc',
): Promise<{ usersList: User[]; count: number }> {
  const collectionRef = db.collection('users');
  let usersList: User[] = [];
  let count = 0;

  try {
    // console.log(
    //   `Fetching users - Page: ${page}, Term: ${term}, SortBy: ${sortBy}, SortOrder: ${sortOrder}`,
    // );

    let baseQuery = collectionRef
      .orderBy(sortBy, sortOrder)
      // Secondary orderBy to avoid conflicts when items have the same value in sortBy
      .orderBy(sortBy === 'fullName' ? 'timestamp' : 'fullName', 'asc');
    // Add filtering constraints if a search term is provided
    if (term) {
      const formattedTerm = term.charAt(0).toUpperCase() + term.slice(1);

      let upperCaseQuery = baseQuery
        .where('fullName', '>=', formattedTerm)
        .where('fullName', '<=', formattedTerm + '\uf8ff');
      let lowerCaseQuery = baseQuery
        .where('fullName', '>=', term.toLowerCase())
        .where('fullName', '<=', term.toLowerCase() + '\uf8ff');
      // Fetch counts for both queries
      const [upperCaseCountSnapshot, lowerCaseCountSnapshot] =
        await Promise.all([upperCaseQuery.get(), lowerCaseQuery.get()]);

      const upperCaseCount = upperCaseCountSnapshot.size;
      const lowerCaseCount = lowerCaseCountSnapshot.size;

      count = upperCaseCount + lowerCaseCount;

      if (page > 1) {
        const prevUpperSnapshot = await upperCaseQuery
          .limit((page - 1) * PAGE_SIZE)
          .get();
        const prevLowerSnapshot = await lowerCaseQuery
          .limit((page - 1) * PAGE_SIZE)
          .get();
        const lastUpperVisible =
          prevUpperSnapshot.docs[prevUpperSnapshot.docs.length - 1];
        const lastLowerVisible =
          prevLowerSnapshot.docs[prevLowerSnapshot.docs.length - 1];

        if (lastUpperVisible) {
          const lastUpperUserData = lastUpperVisible.data();
          //TODO: Check paginating users with term ('j')
          // upperCaseQuery = query(
          //   upperCaseQuery,
          //   startAfter(lastUpperUserData.fullName, lastUpperUserData.timestamp),
          //   limit(PAGE_SIZE),
          // );
          upperCaseQuery = upperCaseQuery
            .startAfter(
              sortBy === 'fullName'
                ? lastUpperUserData.fullName
                : lastUpperUserData.timestamp,
              sortBy === 'timestamp'
                ? lastUpperUserData.timestamp
                : lastUpperUserData.fullName,
            )
            .limit(PAGE_SIZE);
        }

        if (lastLowerVisible) {
          const lastLowerUserData = lastLowerVisible.data();

          lowerCaseQuery = lowerCaseQuery
            .startAfter(
              sortBy === 'fullName'
                ? lastLowerUserData.fullName
                : lastLowerUserData.timestamp,
              sortBy === 'timestamp'
                ? lastLowerUserData.timestamp
                : lastLowerUserData.fullName,
            )
            .limit(PAGE_SIZE);

          // lowerCaseQuery = query(
          //   lowerCaseQuery,
          //   startAfter(lastLowerUserData.fullName, lastLowerUserData.timestamp),
          //   limit(PAGE_SIZE),
          // );
        }
      } else {
        upperCaseQuery = upperCaseQuery.limit(PAGE_SIZE);
        lowerCaseQuery = lowerCaseQuery.limit(PAGE_SIZE);
      }

      // Merge results from both queries
      const [upperCaseSnapshot, lowerCaseSnapshot] = await Promise.all([
        upperCaseQuery.get(),
        lowerCaseQuery.get(),
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
    } else {
      // Count query without filters
      const countSnapshot = await collectionRef.get();
      count = countSnapshot.size;
      // Fetch documents
      baseQuery = baseQuery.limit(PAGE_SIZE);
      if (page > 1) {
        // Fetch documents up to the previous page to determine the start point
        const prevSnapshot = await collectionRef
          .orderBy(sortBy, sortOrder)
          .limit((page - 1) * PAGE_SIZE)
          .get();

        const lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1];

        if (lastVisible) {
          const lastUserData = lastVisible.data();

          if (sortBy === 'fullName') {
            baseQuery = baseQuery
              .startAfter(lastUserData.fullName, lastUserData.timestamp)
              .limit(PAGE_SIZE);
          } else {
            baseQuery = baseQuery
              .startAfter(lastUserData.timestamp, lastUserData.fullName)
              .limit(PAGE_SIZE);
          }
        }
      }

      const usersCollectionSnapshot = await baseQuery.get();

      usersList = usersCollectionSnapshot.docs.map((doc) => ({
        ...(doc.data() as User),
        id: doc.id,
      }));
    }
    // console.log(usersList);
    console.log(count, 'on server');
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return { usersList, count };
};

// GET USER/////

export const getUser = async function (id: string) {
  try {
    // Get the document reference
    const docSnap = await db.collection('users').doc(id).get();

    // Check if the document exists
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      console.error(`User with ID ${id} not found.`);
      notFound();
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};
