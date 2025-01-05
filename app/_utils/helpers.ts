export default function convertTimestamp(rawTimestamp: {
  _seconds: number;
  _nanoseconds: number;
}) {
  const { _seconds, _nanoseconds } = rawTimestamp;

  const convertedDate = new Date(_seconds * 1000 + _nanoseconds / 1000000);

  const formattedDate = convertedDate.toLocaleDateString();

  return formattedDate;
}
