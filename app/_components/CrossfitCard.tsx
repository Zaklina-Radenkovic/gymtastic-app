import {
  PencilIcon,
  UserPlusIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';

function CrossfitCard() {
  return (
    <div className="max-w-[600px] bg-primary-50 pl-3">
      <div>
        <div className="flex justify-between">
          <h5>Crossfit</h5>
          <div>
            <PencilIcon className="h-5 w-5" />
            <UserPlusIcon className="h-5 w-5" />
          </div>
        </div>

        <div className="mb-2 flex gap-4">
          <ClockIcon className="h-5 w-5" />
          <p>Time & date</p>
        </div>
        <div className="flex items-center">
          <UserGroupIcon className="h-5 w-5" />
          <p className="ml-4">5/14</p>
        </div>
      </div>
    </div>
  );
}

export default CrossfitCard;
