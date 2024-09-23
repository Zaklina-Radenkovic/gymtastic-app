import { Timestamp } from 'firebase/firestore';

export default function convertTimestamp(timestamp: Timestamp) {
  const { seconds, nanoseconds } = timestamp;

  const convertedDate = new Date(seconds * 1000 + nanoseconds / 1000000);

  const formattedDate = convertedDate.toLocaleDateString();

  return formattedDate;
}
