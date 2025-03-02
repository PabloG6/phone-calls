import { Clock, Phone, Plus, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { JSX } from "react";

type DesktopSidebarProps = {
  setInputValue: (arg0: string) => void;
  setSearchQuery: (arg0: string) => void;
  setShowAddContact: (arg0: boolean) => void;
  getCallTypeIcon: (arg0: "missed" | "incoming" | "outgoing") => JSX.Element;

  searchQuery: string;
  filteredContacts: {
    name: string;
    id: number;
    avatar: string;
    phone: string;
  }[];
  callHistory: {
    name: string;
    id: number;
    duration: string;
    avatar: string;
    time: string;
    phone: string;
  }[];
};
export function DesktopSidebar({
  searchQuery,
  filteredContacts,
  setSearchQuery,
  callHistory,
  setInputValue,
  setShowAddContact,
}: DesktopSidebarProps) {
  return (
    <Tabs defaultValue="contacts" className="h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="contacts">
          <User className="mr-2 h-4 w-4" />
          Contacts
        </TabsTrigger>
        <TabsTrigger value="history">
          <Clock className="mr-2 h-4 w-4" />
          History
        </TabsTrigger>
      </TabsList>
      <TabsContent value="contacts" className="flex-1 p-0">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="p-4 pt-0">
            {filteredContacts.length > 0 ? (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.phone}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => setInputValue(contact.phone)}
                    >
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call {contact.name}</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">
                No contacts found
              </p>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setShowAddContact(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="history" className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-7rem)]">
          <div className="p-4">
            {callHistory.length > 0 ? (
              <div className="space-y-4">
                {callHistory.map((call) => (
                  <div key={call.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={call.avatar} alt={call.name} />
                      <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">{call.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{call.phone}</span>
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
                      className="h-8 w-8"
                      onClick={() => setInputValue(call.phone)}
                    >
                      <Phone className="h-4 w-4" />
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
      </TabsContent>
    </Tabs>
  );
}
