// export type Participant = {
//   name: string;
//   reference: string;
//   userId: string;
// };

import { Timestamp } from 'firebase/firestore';

// export type Event = {
//   id: string;
//   title: string;
//   start: Date;
//   end: Date;
//   duration: number;
//   participants: Participant[];
//   waitlist: Participant[];
//   maxParticipants: number;
//   body: string;
//   color: string;
//   status: string;
// };

export type Customer = {
  id: string;
  // avatar: string;
  email: string;
  fullName: string;
  expirationDate: Timestamp;
  memberSince: Timestamp;
  role: string;
  status: string;
  timestamp: Timestamp;
  trainings: string;
};
