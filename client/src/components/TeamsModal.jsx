import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeamsAsync } from '@/redux/features/team';
import { useNavigate } from 'react-router-dom';

const TeamsModal = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const teams = useSelector((state) => state.team.teams);
  const loading = useSelector((state) => state.team.loading);
  const error = useSelector((state) => state.team.error);
  const errorMsg = useSelector((state) => state.team.errorMsg);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Teams</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <div className="max-h-60 overflow-y-auto">
          {error && <p className="text-center py-10">{errorMsg}</p>}
          {teams?.length === 0 && !loading && (
            <p className="text-center py-10">No teams found</p>
          )}
          <ul>
            {teams?.map((team) => {
              return (
                <li className="p-2" key={team._id}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{team.name}</p>
                    <Button
                      onClick={() =>
                        navigate(`/team/${team._id}`, { replace: true })
                      }
                    >
                      View
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

export default TeamsModal;
