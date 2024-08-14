import Link from 'next/link';

function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-2xl font-semibold">
        This customer could not be found :(
      </h1>
      <Link
        href="/customers"
        className="inline-block bg-yellow-500 px-6 py-3 text-lg text-primary-800"
      >
        Back to all customers
      </Link>
    </main>
  );
}

export default NotFound;
