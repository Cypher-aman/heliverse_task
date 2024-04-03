import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { toast } from './ui/use-toast';
import { fetchFilteredTeams, addUserToTeam } from '../api/api';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';

const FilteredTeamModal = ({ user, open, setOpen }) => {
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  console.log(error && errorMsg);

  const fetchTeams = (userId) => {
    fetchFilteredTeams(userId)
      .then((res) => setTeams(res.data))
      .catch((err) => {
        setError(true);
        setErrorMsg(err.message);
      })
      .finally(() => setLoading(false));
  };

  const addUserToTeams = (userId, teamId) => {
    setLoading(true);
    addUserToTeam({ userId, teamId })
      .then(() => {
        toast({
          title: 'Success',
          description: 'User added to team successfully',
        });
        fetchTeams(userId);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.message);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeams(user._id);
  }, []);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">
            {user.first_name + ' ' + user.last_name}
          </DialogTitle>
          <DialogDescription>
            <p>
              <strong>Important:</strong> Some teams are not visible because
              they already have members from <i>{user.domain}</i> domain. You
              can only join teams where your domain is not already represented.
            </p>
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <div className="max-h-60 overflow-y-auto">
          {loading && <Skeleton count={5} baseColor="#E5E7EB" />}
          {teams?.length === 0 && !loading && (
            <p className="text-sm text-gray-500">
              It seems that all teams currently have members from this domain.
              Unfortunately, you cannot add this user in any teams at the
              moment.
            </p>
          )}
          <ul>
            {teams?.map((team) => {
              return (
                <li className="p-2" key={team._id}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{team.name}</p>
                    <Button onClick={() => addUserToTeams(user._id, team._id)}>
                      Add
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilteredTeamModal;
