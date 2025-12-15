import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { AVAILABLE_BASES, type BaseId } from "@/lib/baseConfig";
import type { Endianness } from "@/lib/byteUtils";
import { Settings } from "lucide-react";

type BaseSettingsPopoverProps = {
  selectedBases: BaseId[];
  onSelectionChange: (selectedIds: BaseId[]) => void;
  endianness: Endianness;
  onEndiannessChange: (endianness: Endianness) => void;
};

export function BaseSettingsPopover({
  selectedBases,
  onSelectionChange,
  endianness,
  onEndiannessChange,
}: BaseSettingsPopoverProps) {
  const handleToggle = (baseId: BaseId, checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") return;

    if (checked) {
      onSelectionChange([...selectedBases, baseId]);
    } else {
      onSelectionChange(selectedBases.filter((id) => id !== baseId));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Base settings">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Display Bases</h4>
          <div className="space-y-3">
            {AVAILABLE_BASES.map((base) => {
              const isSelected = selectedBases.includes(base.id);
              const lastTwoSelected = selectedBases.length <= 2 && isSelected;

              return (
                <div key={base.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={base.id}
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleToggle(base.id, checked)
                    }
                    disabled={lastTwoSelected}
                  />
                  <Label
                    htmlFor={base.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {base.label}
                  </Label>
                </div>
              );
            })}
          </div>
          <div className="pt-3 border-t space-y-3">
            <h4 className="font-medium text-sm">Byte Order</h4>
            <div className="flex items-center justify-between">
              <Label htmlFor="endianness-toggle" className="text-sm font-normal">
                Little-endian
              </Label>
              <Switch
                id="endianness-toggle"
                checked={endianness === "little"}
                onCheckedChange={(checked) =>
                  onEndiannessChange(checked ? "little" : "big")
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {endianness === "big"
                ? "Most significant byte first (Big-endian)"
                : "Least significant byte first (Little-endian)"}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
