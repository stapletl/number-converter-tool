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
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";

const Home: React.FC = () => {
  const [num, setNum] = useState<string>("");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-96 pb-4 gap-4">
        <AnimatedThemeToggler />
      </div>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Number Converter</CardTitle>
          <CardDescription>
            Convert between different number bases in real time
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
