import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Household() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Input
          placeholder="Household"
          className="w-50 bg-[repeating-linear-gradient(45deg,#808080,#808080_10px,transparent_10px,transparent_20px)]"
          disabled
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Household is not available in this version of the app</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default Household;
