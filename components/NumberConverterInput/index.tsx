import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import getValidInput from "./getValidInput";
import convertBase from "./convertBase";
import React from "react";

const BASE_TEN_PLACEHOLDER = "123";

type NumberConverterInputProps = {
  label: string;
  base: number;
  baseTenValue: string;
  setBaseTenValue: (value: string) => void;
};

export const NumberConverterInput = ({
  label,
  base,
  baseTenValue,
  setBaseTenValue,
}: NumberConverterInputProps) => {
  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    console.log("Input event:", input);
    const validInput = getValidInput(base, input);
    console.log("Valid input:", validInput);
    setBaseTenValue(convertBase(validInput, base, 10));
  };

  return (
    <div className="grow flex flex-col gap-1.5">
      <Label htmlFor={`base-${base}-input`}>{label}</Label>
      <Input
        type="text"
        id={`base-${base}-input`}
        placeholder={convertBase(BASE_TEN_PLACEHOLDER, 10, base)}
        value={convertBase(baseTenValue, 10, base)}
        onChange={(e) => handleFieldUpdate(e)}
      />
    </div>
  );
};
