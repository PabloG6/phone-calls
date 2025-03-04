import { Phone, PhoneOutgoingIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { api } from "@/server/react";
import { formatDuration } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
type Props = {
  setInputValue: Dispatch<SetStateAction<string>>;
};
export default function CallHistory({ setInputValue }: Props) {
  const { data: callHistory } = api.callLogs.list.useQuery();
  return (
    <ScrollArea className="h-[calc(100vh-7rem)]">
      <div className="p-4">
        {callHistory && callHistory.length > 0 ? (
          <div className="space-y-4">
            {callHistory.map((call) => (
              <div key={call.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt={call.name} />
                  <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium">{call.name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{call.phoneNumber}</span>
                    {call.duration && (
                      <>
                        <span>•</span>
                        <span>{formatDuration(call.duration)}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4"
                  onClick={() => setInputValue(call.phoneNumber)}
                >
                  {call.direction === "outgoing" && <PhoneOutgoingIcon />}
                  {call.direction === "incoming" && (
                    <Phone className="h-4 w-4" />
                  )}
                  <span className="sr-only">Call {call.name}</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">
            No call history
          </p>
        )}
      </div>
    </ScrollArea>
  );
}
