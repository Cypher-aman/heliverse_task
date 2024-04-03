import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamByIdAsync } from '../redux/features/team';
import { useEffect } from 'react';
import { deleteUserFormTeam, deleteTeamById } from '../api/api';

import { GoHomeFill } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

import UserCard from '@/components/UserCard';
import { Button } from '@/components/ui/button';
import LoadingDots from '@/components/skeleton/LoadingDots';

const Team = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const teamId = params.id;

  const team = useSelector((state) => state.team.team);
  const loading = useSelector((state) => state.team.loading);
  const error = useSelector((state) => state.team.error);
  const errorMsg = useSelector((state) => state.team.errorMsg);

  useEffect(() => {
    dispatch(fetchTeamByIdAsync(teamId));
  }, []);

  if (loading) {
    return <LoadingDots />;
  }

  if (error) {
    return <div>{errorMsg}</div>;
  }

  const removeFromTeam = (userId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this user from the team?'
    );

    if (!confirm) return;

    deleteUserFormTeam({ userId, teamId })
      .then(() => {
        dispatch(fetchTeamByIdAsync(teamId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTeam = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this team?'
    );

    if (!confirm) return;
    deleteTeamById(teamId)
      .then(() => {
        navigation('/', { replace: true });
      })
      .catch((error) => {
        alert('Something went wrong, see console for more details');
        console.log(error);
      });
  };

  return (
    <main className="container">
      <div className=" py-10">
        <Button
          onClick={() => navigation('/')}
          variant="outline"
          className="gap-2"
        >
          <GoHomeFill />
          Back
        </Button>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold py-5">{team?.name}</h1>
          <Button onClick={handleDeleteTeam} variant="destructive">
            <MdDelete />{' '}
            <span className="md:inline-block hidden md:ml-2">Delete Team</span>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-3">
          {team?.users?.length > 0 ? (
            team.users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                removeFromTeam={removeFromTeam}
              />
            ))
          ) : (
            <p>No users in the team</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Team;
