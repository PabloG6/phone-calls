"use client";

import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Clock,
  Menu,
  Mic,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Plus,
  Search,
  User,
  X,
  Settings,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CallingScreen } from "./calling-screen";

// Format phone number as user types

// Update the main container to prevent page scrolling
export default function PhoneApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("+1");

  // Sample data for contacts
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Alex Johnson",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sarah Williams",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Michael Brown",
      phone: "+1 (555) 876-5432",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Emily Davis",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "David Wilson",
      phone: "+1 (555) 654-3210",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      phone: "+1 (555) 789-0123",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  // Sample data for call history
  const callHistory = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      time: "10:30 AM",
      type: "incoming",
      duration: "5:23",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
      time: "Yesterday",
      type: "outgoing",
      duration: "2:45",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Unknown",
      phone: "+1 (555) 456-7890",
      time: "Yesterday",
      type: "missed",
      duration: "",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sarah Williams",
      phone: "+1 (555) 234-5678",
      time: "Mar 15",
      type: "incoming",
      duration: "1:12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Michael Brown",
      phone: "+1 (555) 876-5432",
      time: "Mar 14",
      type: "outgoing",
      duration: "0:45",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Unknown",
      phone: "+1 (555) 345-6789",
      time: "Mar 12",
      type: "missed",
      duration: "",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery),
  );

  // Function to get call type icon
  const getCallTypeIcon = (type) => {
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

  const phoneNumbers = [
    { value: "+1", label: "Main Line (+1)" },
    { value: "+44", label: "Work (+44)" },
    { value: "+81", label: "Personal (+81)" },
  ];

  const handleStartCall = (number, contactName = null) => {
    setActiveCall({ number, contactName });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex h-14 items-center border-b bg-background px-4">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 sm:max-w-xs">
            <MobileSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredContacts={filteredContacts}
              callHistory={callHistory}
              getCallTypeIcon={getCallTypeIcon}
              onClose={() => setSidebarOpen(false)}
              setInputValue={setInputValue}
              setShowAddContact={setShowAddContact}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Phone</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SettingsPanel />
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        {" "}
        {/* min-h-0 is crucial for nested scrolling */}
        <aside className="hidden w-[320px] flex-shrink-0 border-r md:block">
          <DesktopSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContacts={filteredContacts}
            callHistory={callHistory}
            getCallTypeIcon={getCallTypeIcon}
            setInputValue={setInputValue}
            setShowAddContact={setShowAddContact}
            onCallClick={(number, name) => handleStartCall(number, name)}
          />
        </aside>
        <main className="flex-1 flex items-center justify-center p-4">
          <DialPad
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectedPhoneNumber={selectedPhoneNumber}
            setSelectedPhoneNumber={setSelectedPhoneNumber}
            phoneNumbers={phoneNumbers}
            onCall={() => handleStartCall(inputValue)}
          />
        </main>
      </div>
      {showAddContact && (
        <AddContactModal onClose={() => setShowAddContact(false)} />
      )}
      {activeCall && (
        <CallingScreen
          phoneNumber={activeCall.number}
          contactName={activeCall.contactName}
          onEnd={() => setActiveCall(null)}
        />
      )}
    </div>
  );
}

function DialPad({
  inputValue,
  setInputValue,
  selectedPhoneNumber,
  setSelectedPhoneNumber,
  phoneNumbers,
  onCall,
}) {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);

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

  const handleKeyPress = (key) => {
    const newValue = inputValue + key;
    setInputValue(formatPhoneNumber(newValue));
  };

  const handleDelete = () => {
    if (!isLongPressing) {
      setInputValue((prev) => {
        const digits = parsePhoneNumber(prev);
        if (digits.length <= 1) return "";
        return formatPhoneNumber(digits.slice(0, -1));
      });
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
      <div className="mb-6 text-center space-y-4">
        <Select
          value={selectedPhoneNumber}
          onValueChange={setSelectedPhoneNumber}
        >
          <SelectTrigger className="w-[180px] mx-auto">
            <SelectValue placeholder="Select line" />
          </SelectTrigger>
          <SelectContent>
            {phoneNumbers.map((phone) => (
              <SelectItem key={phone.value} value={phone.value}>
                {phone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-3xl font-normal tracking-wider">
          {inputValue || "Enter number"}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {dialPadKeys.map((key) => (
          <Button
            key={key.number}
            variant="ghost"
            className={cn(
              "h-14 text-center flex flex-col items-center justify-center rounded-xl",
              "hover:bg-primary/10 active:bg-primary/20 transition-colors",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
            onClick={() => handleKeyPress(key.number)}
          >
            <span className="text-xl font-normal">{key.number}</span>
            {key.letters && (
              <span className="text-xs text-muted-foreground">
                {key.letters}
              </span>
            )}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {!inputValue && (
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "h-14 w-14 rounded-full",
              "hover:bg-primary/10 active:bg-primary/20 transition-colors",
            )}
          >
            <Mic className="h-6 w-6" />
            <span className="sr-only">Voice</span>
          </Button>
        )}
        {inputValue && (
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "h-14 w-14 rounded-full",
              "hover:bg-primary/10 active:bg-primary/20 transition-colors",
            )}
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
        <Button
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full bg-primary hover:bg-primary/90",
            "shadow-lg hover:shadow-xl transition-all",
            "disabled:opacity-50 disabled:shadow-none",
          )}
          disabled={!inputValue}
          onClick={() => onCall()}
        >
          <Phone className="h-6 w-6" />
          <span className="sr-only">Call</span>
        </Button>
      </div>
    </div>
  );
}

// Update contact item styling
function ContactItem({ contact, onCallClick }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-xl transition-colors",
        "hover:bg-white active:bg-primary/5",
        "border border-transparent hover:border-gray-100",
      )}
    >
      <Avatar className="h-10 w-10 border-2 border-primary/10">
        <AvatarImage src={contact.avatar} alt={contact.name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {contact.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none mb-1">{contact.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {contact.phone}
        </p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "h-8 w-8 rounded-full",
          "hover:bg-primary/10 hover:text-primary",
          "active:bg-primary/20",
        )}
        onClick={() => onCallClick(contact.phone, contact.name)}
      >
        <Phone className="h-4 w-4" />
        <span className="sr-only">Call {contact.name}</span>
      </Button>
    </div>
  );
}

// Update history item styling
function HistoryItem({ call, onCallClick, getCallTypeIcon }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-xl transition-colors",
        "hover:bg-white active:bg-primary/5",
        "border border-transparent hover:border-gray-100",
      )}
    >
      <Avatar className="h-10 w-10 border-2 border-primary/10">
        <AvatarImage src={call.avatar} alt={call.name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {call.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <p className="text-sm font-medium leading-none">{call.name}</p>
          {getCallTypeIcon(call.type)}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="truncate">{call.phone}</span>
          <span>•</span>
          <span>{call.time}</span>
          {call.duration && (
            <>
              <span>•</span>
              <span>{call.duration}</span>
            </>
          )}
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "h-8 w-8 rounded-full",
          "hover:bg-primary/10 hover:text-primary",
          "active:bg-primary/20",
        )}
        onClick={() => onCallClick(call.phone, call.name)}
      >
        <Phone className="h-4 w-4" />
        <span className="sr-only">Call back</span>
      </Button>
    </div>
  );
}

// Update the AddContactModal to be more Material-like
function AddContactModal({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className={cn(
          "bg-background w-full sm:rounded-2xl sm:max-w-md",
          "animate-in slide-in-from-bottom duration-300",
          "shadow-xl",
        )}
      >
        <div className="flex items-center justify-between p-4 sm:p-6">
          <h2 className="text-xl font-normal">Add New Contact</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-normal">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="rounded-lg h-12"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-normal">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className="rounded-lg h-12"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-full font-normal"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full font-normal">
              Save Contact
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Update the SettingsPanel to be more Material-like
function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-xl font-normal">Settings</h2>
          <p className="text-base text-muted-foreground">
            Manage your phone settings
          </p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Account section */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-muted-foreground">
            Account
          </h3>
          <div className={cn("p-4 rounded-xl space-y-4", "bg-primary/5")}>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-base font-normal">User Name</p>
                <p className="text-sm text-muted-foreground">
                  user@example.com
                </p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Other sections with Material-like styling */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-muted-foreground">
            General
          </h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-base font-normal">Call Forwarding</p>
                <p className="text-sm text-muted-foreground">
                  Forward calls when busy
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-base font-normal">Call Waiting</p>
                <p className="text-sm text-muted-foreground">
                  Get notified of incoming calls
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium text-muted-foreground">
            Sound & Vibration
          </h3>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-normal">Ringtone Volume</p>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  75%
                </span>
              </div>
              <Slider
                defaultValue={[75]}
                max={100}
                step={1}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-base font-normal">Vibrate on Ring</p>
                <p className="text-sm text-muted-foreground">
                  Vibrate when receiving calls
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update MobileSidebar to match DesktopSidebar styling
function MobileSidebar({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  callHistory,
  getCallTypeIcon,
  onClose,
  setInputValue,
  setShowAddContact,
}) {
  const handleCallClick = (phoneNumber) => {
    setInputValue(phoneNumber);
    onClose();
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex items-center justify-between h-14 px-4 border-b">
        <h2 className="text-lg font-semibold">Phone</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <Tabs defaultValue="contacts" className="flex-1">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-xl">
            <TabsTrigger
              value="contacts"
              className={cn(
                "rounded-lg data-[state=active]:bg-white",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "transition-all duration-200",
              )}
            >
              <User className="mr-2 h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className={cn(
                "rounded-lg data-[state=active]:bg-white",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "transition-all duration-200",
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="contacts"
          className="flex-1 flex flex-col px-4 pt-4"
        >
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="space-y-1">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    onCallClick={() => handleCallClick(contact.phone)}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No contacts found
                </p>
              )}
            </div>
          </ScrollArea>
          <div className="pt-4 pb-4">
            <Button
              className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
              variant="ghost"
              onClick={() => {
                setShowAddContact(true);
                onClose();
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="history" className="flex-1 flex flex-col px-4">
          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="space-y-1 pt-2">
              {callHistory.length > 0 ? (
                callHistory.map((call) => (
                  <HistoryItem
                    key={call.id}
                    call={call}
                    getCallTypeIcon={getCallTypeIcon}
                    onCallClick={() => handleCallClick(call.phone)}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No call history
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Update the tabs styling and layout
function DesktopSidebar({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  callHistory,
  getCallTypeIcon,
  setInputValue,
  setShowAddContact,
  onCallClick,
}) {
  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <Tabs defaultValue="contacts" className="h-full flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-xl">
            <TabsTrigger
              value="contacts"
              className={cn(
                "rounded-lg data-[state=active]:bg-white",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "transition-all duration-200",
              )}
            >
              <User className="mr-2 h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className={cn(
                "rounded-lg data-[state=active]:bg-white",
                "data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "transition-all duration-200",
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="contacts"
          className="flex-1 flex flex-col px-4 pt-4 overflow-hidden"
        >
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto -mx-4 px-4">
            <div className="space-y-1">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    onCallClick={onCallClick}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No contacts found
                </p>
              )}
            </div>
          </div>
          <div className="pt-4 pb-4">
            <Button
              className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
              variant="ghost"
              onClick={() => setShowAddContact(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </TabsContent>
        <TabsContent
          value="history"
          className="flex-1 flex flex-col px-4 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto -mx-4 px-4">
            <div className="space-y-1 pt-2">
              {callHistory.length > 0 ? (
                callHistory.map((call) => (
                  <HistoryItem
                    key={call.id}
                    call={call}
                    getCallTypeIcon={getCallTypeIcon}
                    onCallClick={() => onCallClick(call.phone, call.name)}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No call history
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
