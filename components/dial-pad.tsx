import { Mic, Phone, X } from "lucide-react";
import { Button } from "./ui/button";
import { formatPhoneNumber, parsePhoneNumber } from "@/lib/utils";
import { Dispatch, useCallback, useEffect, useState } from "react";
type Props = {
  inputValue: string;
  setActiveCall: Dispatch<React.SetStateAction<string | null>>;
  setInputValue: (input: string) => void;
};
export function DialPad({ inputValue, setInputValue, setActiveCall }: Props) {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [pressTimer, setPressTimer] = useState<Timer | undefined>();
  const startLongPress = useCallback(() => {
    const timer = setTimeout(() => {
      setIsLongPressing(true);
      setInputValue("");
    }, 500); // 500ms for long press
    setPressTimer(timer);
  }, [setInputValue]);

  const endLongPress = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
    setIsLongPressing(false);
  }, [pressTimer]);

  useEffect(() => {
    return () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
      }
    };
  }, [pressTimer]);

  const handleKeyPress = (key: string) => {
    const newValue = inputValue + key;
    setInputValue(formatPhoneNumber(newValue));
  };
  const handleDelete = () => {
    if (!isLongPressing) {
      setInputValue(
        ((prev: string) => {
          const digits = parsePhoneNumber(prev);
          if (digits.length <= 1) return "";
          return formatPhoneNumber(digits.slice(0, -1));
        })(inputValue),
      );
    }
  };

  const dialPadKeys = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "+" },
    { number: "#", letters: "" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <div className="text-3xl font-semibold mb-2">{inputValue || ""}</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {dialPadKeys.map((key) => (
          <Button
            key={key.number}
            variant="outline"
            className="h-16 text-center flex flex-col items-center justify-center"
            onClick={() => handleKeyPress(key.number)}
          >
            <span className="text-xl font-medium">{key.number}</span>
            {key.letters && (
              <span className="text-xs text-muted-foreground">
                {key.letters}
              </span>
            )}
          </Button>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button
          size="icon"
          onClick={() => {
            setActiveCall(inputValue);
          }}
          className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600"
          disabled={!inputValue}
        >
          <Phone className="h-6 w-6" />
          <span className="sr-only">Call</span>
        </Button>
        {inputValue && (
          <Button
            size="icon"
            variant="outline"
            className="h-16 w-16 rounded-full"
            onClick={handleDelete}
            onMouseDown={startLongPress}
            onMouseUp={endLongPress}
            onMouseLeave={endLongPress}
            onTouchStart={startLongPress}
            onTouchEnd={endLongPress}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Delete</span>
          </Button>
        )}
        {!inputValue && (
          <Button
            size="icon"
            variant="outline"
            className="h-16 w-16 rounded-full"
          >
            <Mic className="h-6 w-6" />
            <span className="sr-only">Voice</span>
          </Button>
        )}
      </div>
    </div>
  );
}
