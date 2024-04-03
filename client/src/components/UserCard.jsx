import FilteredTeamModal from './FilteredTeamModal';
import { memo, useState } from 'react';
import { Button } from './ui/button';
import { UserNotAvailable } from './NotAvailableTooltip';

const UserCard = ({ user, addToTeam, removeFromTeam }) => {
  const [open, setOpen] = useState(false);


  return (
    <div
      key={user._id}
      className="bg-white shadow-md items-center rounded-lg p-4 flex flex-col "
    >
      <div className="flex bg-gray-100 rounded-full p-3 mb-3">
        <img src={user.avatar} alt={user.first_name} />
      </div>
      <p className="text-center font-semibold text-lg">
        {user.first_name + ' ' + user.last_name}
      </p>
      <p className="text-center text-gray-600 text-sm mb-2">{user.email}</p>
      <p className="text-center text-gray-800 text-sm">{user.gender}</p>
      <p className="text-center text-gray-800 text-sm">{user.domain}</p>
      <p className="text-center text-gray-800 text-sm">{user.available}</p>
      <p
        className={`text-center font-semibold text-gray-800 text-sm ${
          user.available ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {user.available ? 'Available' : 'UnAvailable'}
      </p>
      {addToTeam &&
        (user.available ? (
          <Button
            onClick={() => setOpen(true)}
            className="mt-2"
            variant="outline"
          >
            Add to team
          </Button>
        ) : (
          <UserNotAvailable />
        ))}
      {removeFromTeam && (
        <Button
          onClick={() => removeFromTeam(user._id)}
          className="mt-2"
          variant="destructive"
        >
          Remove
        </Button>
      )}
      {open && <FilteredTeamModal user={user} open={open} setOpen={setOpen} />}
    </div>
  );
};

UserCard.displayName = 'UserCard';

export default memo(UserCard);
