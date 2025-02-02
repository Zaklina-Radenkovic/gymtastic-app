'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from './Select';

const sortOptions = [
  {
    value: 'name-asc',
    label: 'Sort by name (A-Z)',
  },
  {
    value: 'name-desc',
    label: 'Sort by name (Z-A)',
  },
  {
    value: 'timestamp-desc',
    label: 'Last update (newest)',
  },
  {
    value: 'timestamp-asc',
    label: 'Last update (oldest)',
  },
];

function SortBy({ sortBy }: { sortBy: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select options={sortOptions} value={sortBy} onChange={handleChange} />
  );
}
export default SortBy;
