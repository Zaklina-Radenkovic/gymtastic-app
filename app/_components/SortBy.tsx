import Select from './Select';

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc',
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc',
  },
];

function SortBy() {
  return <Select options={sortOptions} value="" onChange={() => ''} />;
}
export default SortBy;
