// export type Participant = {
//   name: string;
//   reference: string;
//   userId: string;
// };

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
  expirationDate: Date;
  memberSince: Date;
  role: string;
  status: string;
  timestamp: Date;
  trainings: string;
};
