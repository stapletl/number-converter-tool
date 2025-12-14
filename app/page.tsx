"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NumberConverterInput } from "@/components/NumberConverterInput";
import { useState } from "react";

const Home: React.FC = () => {
  const [num, setNum] = useState<string>("");

  return (
    <div className="relative w-full h-dvh overflow-hidden flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Number Converter</CardTitle>
          <CardDescription>
            Convert between different bases in real time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NumberConverterInput
            label="Decimal"
            placeholder="123"
            base={10}
            value={num}
            setValue={setNum}
          />
          <NumberConverterInput
            label="Binary"
            placeholder="1111011"
            base={2}
            value={num}
            setValue={setNum}
          />
          <NumberConverterInput
            label="Hexadecimal"
            placeholder="7b"
            base={16}
            value={num}
            setValue={setNum}
          />
          <NumberConverterInput
            label="Octal"
            placeholder="173"
            base={8}
            value={num}
            setValue={setNum}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
