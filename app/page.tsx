"use client";

import { ModeToggle } from "@/components/ui/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NumberConverterInput } from "@/components/NumberConverterInput";
import { useState } from "react";

const Home = () => {
  const [num, setNum] = useState<string>("");

  return (
    <div>
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Card>
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
    </div>
  );
};

export default Home;
