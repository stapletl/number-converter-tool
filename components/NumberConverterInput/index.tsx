import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import getValidInput from "./getValidInput";
import convertBase from "./convertBase";
import React from "react";

type NumberConverterInputProps = {
  label: string;
  placeholder: string;
  base: number;
  value: string;
  setValue: (value: string) => void;
};

export const NumberConverterInput = ({
  label,
  placeholder,
  base,
  value,
  setValue,
}: NumberConverterInputProps) => {
  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const validInput = getValidInput(label, input);
    setValue(convertBase(validInput, base, 10));
  };

  return (
    <div className="pb-1.5 grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="label">{label}</Label>
      <Input
        type="text"
        id="label"
        placeholder={placeholder}
        value={convertBase(value, 10, base)}
        onChange={(e) => handleFieldUpdate(e)}
      />
    </div>
  );
};
