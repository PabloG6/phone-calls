"use client";

import { useState } from "react";
import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing } from "lucide-react";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { DialPad } from "@/components/dial-pad";
import { AddContactModal } from "@/components/add-contact";
import HomeHeader from "@/components/home-header";
import { CallingScreen } from "@/components/calling-screen";
// Parse formatted phone number back to digits only

export default function PhoneApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [activeCall, setActiveCall] = useState<string | null>(null);
  // Sample data for contacts
  // Function to get call type icon
  const getCallTypeIcon = (type: "incoming" | "outgoing" | "missed") => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-green-500" />;
      case "outgoing":
        return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HomeHeader />
      <div className="flex flex-1">
        <aside className="hidden w-[280px] flex-shrink-0 border-r md:block">
          <DesktopSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContacts={[]}
            callHistory={[]}
            getCallTypeIcon={getCallTypeIcon}
            setInputValue={setInputValue}
            setShowAddContact={setShowAddContact}
          />
        </aside>
        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center p-4">
            <DialPad
              setActiveCall={setActiveCall}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
        </main>
      </div>
      {showAddContact && <AddContactModal onClose={() => {}} />}

      {activeCall && (
        <CallingScreen
          phoneNumber={activeCall}
          onEnd={() => {
            setActiveCall(null);
          }}
          contactName={null}
        />
      )}
    </div>
  );
}
