import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function UserNotAvailable() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-not-allowed">
          <Button className="mt-2" variant="outline" disabled>
            Add to team
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-red-500">User is not available</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
