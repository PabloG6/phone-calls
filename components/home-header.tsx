import { PhoneCall, Settings } from "lucide-react";
import { Button } from "./ui/button";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 justify-between items-center border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <PhoneCall className="h-5 w-5" />
        <h1 className="text-lg font-semibold">Phone</h1>
      </div>

      <Button variant={"ghost"} size="icon">
        <Settings />
      </Button>
    </header>
  );
}
