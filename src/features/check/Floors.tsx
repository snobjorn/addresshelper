import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Floors() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Input
          placeholder="Floor"
          className="w-50 bg-[repeating-linear-gradient(45deg,#808080,#808080_10px,transparent_10px,transparent_20px)]"
          disabled
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Floor is not available in this version of the app</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default Floors;
