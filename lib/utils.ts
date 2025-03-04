import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if necessary
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
export const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/\D/g, "");

  // Always start with +
  if (phoneNumber.length === 0) return "";

  // Format based on length
  if (phoneNumber.length <= 1) {
    return `+${phoneNumber}`;
  } else if (phoneNumber.length <= 4) {
    return `+${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1)}`;
  } else if (phoneNumber.length <= 7) {
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
  } else {
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
  }
};

// Parse formatted phone number back to digits only
export const parsePhoneNumber = (formattedNumber: string) => {
  return formattedNumber.replace(/\D/g, "");
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
