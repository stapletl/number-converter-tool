import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AVAILABLE_DATA_TYPES, isInRange } from "@/lib/dataTypeConfig";
import {
  formatByteRepresentation,
  isMultiByte,
  type Endianness,
} from "@/lib/byteUtils";
import { LaptopMinimalCheck, Check, X } from "lucide-react";

type DataTypeRangeStatusProps = {
  baseTenValue: string;
  endianness: Endianness;
};

export function DataTypeRangeStatus({
  baseTenValue,
  endianness,
}: DataTypeRangeStatusProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Data type range status"
        >
          <LaptopMinimalCheck className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Type Range Status</h4>
          <div className="space-y-3">
            {AVAILABLE_DATA_TYPES.map((dataType) => {
              const inRange = isInRange(baseTenValue, dataType.range);
              const byteRep = isMultiByte(dataType.id)
                ? formatByteRepresentation(
                    baseTenValue,
                    dataType.id,
                    endianness
                  )
                : null;

              return (
                <div
                  key={dataType.id}
                  className="flex items-start justify-between gap-2"
                >
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-sm font-normal">
                      {dataType.label}
                    </Label>
                    {byteRep && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {byteRep.formatted}
                      </span>
                    )}
                  </div>
                  {inRange ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
