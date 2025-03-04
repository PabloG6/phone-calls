import { Clock, Phone, Plus, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AddContactModal } from "./add-contact";
import { DialogTitle } from "@radix-ui/react-dialog";
import { api } from "@/server/react";
import { ContactSelect } from "@/db/schema";
import CallHistory from "./call-history";

type DesktopSidebarProps = {
  setInputValue: Dispatch<SetStateAction<string>>;
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
  setSearchQuery,

  setInputValue,
}: DesktopSidebarProps) {
  const [open, onOpenChange] = useState<boolean>();
  const { data: contactList } = api.contacts.list.useQuery();
  const [filteredContacts, setFilteredContacts] = useState<ContactSelect[]>([]);
  useEffect(() => {
    const contacts =
      contactList?.filter((c) => {
        return c.name.toLowerCase().includes(searchQuery);
      }) ?? [];
    setFilteredContacts(contacts);
  }, [contactList, searchQuery]);
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
            {filteredContacts?.length > 0 ? (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.phoneNumber}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => setInputValue(contact.e164Rep)}
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
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline" onClick={() => {}}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add new contact</DialogTitle>
              <AddContactModal onOpenChange={onOpenChange} />
            </DialogContent>
          </Dialog>
        </div>
      </TabsContent>
      <TabsContent value="history" className="flex-1 p-0">
        <CallHistory setInputValue={setInputValue} />
      </TabsContent>
    </Tabs>
  );
}
