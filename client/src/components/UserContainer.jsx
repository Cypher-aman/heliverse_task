import UserCard from '@/components/UserCard';
import { memo } from 'react';

const UserContainer = ({ users }) => {
  return (
    <div className="flex-1">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-3">
        {users.map((user) => (
          <UserCard key={user._id} user={user} addToTeam />
        ))}
      </div>
    </div>
  );
};

export default memo(UserContainer);
