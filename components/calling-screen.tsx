"use client";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, PhoneOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/server/react";
import { Call, Device } from "@twilio/voice-sdk";
import { twilioNumber } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
type Props = {
  phoneNumber: string;
  onEnd: () => void;
  contactName: string | null;
};
export function CallingScreen({
  phoneNumber,
  onEnd,
  contactName = null,
}: Props) {
  const [callStatus, setCallStatus] = useState<
    "calling" | "connected" | "failed" | "accepted" | "idle" | "disconnected"
  >("calling"); // calling, connected
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { mutate } = api.tele.createOutgoingCallToken.useMutation();
  const [call, setCall] = useState<Call>();

  const onAcceptCall = useCallback(() => {
    setCallStatus("connected");
  }, []);
  const onDisconnectCall = useCallback(() => {
    setCallStatus("disconnected");
  }, []);
  const onCancelCall = useCallback(() => {
    setCallStatus("idle");
  }, []);
  const onError = useCallback(() => {
    setCallStatus("failed");
  }, []);
  useEffect(() => {
    call?.on("accept", onAcceptCall);
    call?.on("disconnected", onDisconnectCall);
    call?.on("cancel", onCancelCall);
    call?.on("error", onError);
  }, [call, onAcceptCall, onCancelCall, onDisconnectCall, onError]);
  useEffect(() => {
    const parsedNumber =
      parsePhoneNumberFromString(phoneNumber)?.format("E.164");
    if (!parsedNumber) {
      toast({
        description: "Invalid phone number",
        title: "Something went wrong",
        variant: "destructive",
      });
      return;
    }
    mutate(parsedNumber, {
      onSettled: async (value) => {
        const myDevice = new Device(value!.token);

        const callConnected = await myDevice?.connect({
          params: {
            To: parsedNumber,
            From: twilioNumber,
          },
        });
        setCall(callConnected);
      },
      onError(ctx) {
        console.log("hello", ctx.data, ctx.message, ctx.shape);
      },
    });
  }, [mutate, phoneNumber, onEnd]);
  useEffect(() => {
    let durationTimer: Timer | undefined;
    if (callStatus === "connected") {
      durationTimer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(durationTimer);
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center p-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full gap-8">
        <div className="text-center">
          <Avatar className="w-32 h-32 mb-6 mx-auto">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="text-4xl">
              {contactName ? contactName.charAt(0) : "#"}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold mb-2">
            {contactName || phoneNumber}
          </h2>
          <p className="text-muted-foreground">
            {callStatus === "calling"
              ? "Calling..."
              : formatDuration(callDuration)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full",
              isMuted && "bg-primary/10 text-primary",
            )}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-16 w-16 rounded-full"
            onClick={() => {
              call?.disconnect();
              onEnd();
            }}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full",
              isSpeaker && "bg-primary/10 text-primary",
            )}
            onClick={() => setIsSpeaker(!isSpeaker)}
          >
            <Volume2 className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
