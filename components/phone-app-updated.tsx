"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

// Format phone number as user types
const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/\D/g, "")

  // Format based on length
  if (phoneNumber.length < 4) {
    return phoneNumber
  } else if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  } else if (phoneNumber.length < 11) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
  } else {
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`
  }
}

// Parse formatted phone number back to digits only
const parsePhoneNumber = (formattedNumber: string) => {
  return formattedNumber.replace(/\D/g, "")
}

export default function PhoneApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [showAddContact, setShowAddContact] = useState(false)

  // Sample data for contacts
  const contacts = [
    { id: 1, name: "John Doe", phone: "+1 (555) 123-4567", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Jane Smith", phone: "+1 (555) 987-6543", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Alex Johnson", phone: "+1 (555) 456-7890", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Sarah Williams", phone: "+1 (555) 234-5678", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Michael Brown", phone: "+1 (555) 876-5432", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 6, name: "Emily Davis", phone: "+1 (555) 345-6789", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 7, name: "David Wilson", phone: "+1 (555) 654-3210", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 8, name: "Lisa Taylor", phone: "+1 (555) 789-0123", avatar: "/placeholder.svg?height=40&width=40" },
  ]

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
  ]

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery),
  )

  // Function to get call type icon
  const getCallTypeIcon = (type) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-green-500" />
      case "outgoing":
        return <PhoneOutgoing className="h-4 w-4 text-blue-500" />
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-red-500" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4">
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
        <div className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Phone</h1>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[280px] flex-shrink-0 border-r md:block">
          <DesktopSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContacts={filteredContacts}
            callHistory={callHistory}
            getCallTypeIcon={getCallTypeIcon}
            setInputValue={setInputValue}
            setShowAddContact={setShowAddContact}
          />
        </aside>
        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center p-4">
            <DialPad inputValue={inputValue} setInputValue={setInputValue} />
          </div>
        </main>
      </div>
      {showAddContact && <AddContactModal onClose={() => setShowAddContact(false)} />}
    </div>
  )
}

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
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Phone</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <Tabs defaultValue="contacts" className="flex-1">
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
          <ScrollArea className="h-[calc(100vh-10rem)]">
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
                        <p className="text-xs text-muted-foreground truncate">{contact.phone}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => {
                          setInputValue(contact.phone)
                          onClose()
                        }}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call {contact.name}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">No contacts found</p>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setShowAddContact(true)
                onClose()
              }}
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
                          {getCallTypeIcon(call.type)}
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
                        onClick={() => {
                          setInputValue(call.phone)
                          onClose()
                        }}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call {call.name}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">No call history</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DesktopSidebar({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  callHistory,
  getCallTypeIcon,
  setInputValue,
  setShowAddContact,
}) {
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
        <ScrollArea className="h-[calc(100vh-10rem)]">
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
                      <p className="text-xs text-muted-foreground truncate">{contact.phone}</p>
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
              <p className="text-center text-sm text-muted-foreground py-4">No contacts found</p>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button className="w-full" variant="outline" onClick={() => setShowAddContact(true)}>
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
                        {getCallTypeIcon(call.type)}
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
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setInputValue(call.phone)}>
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call {call.name}</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">No call history</p>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}

function DialPad({ inputValue, setInputValue }) {
  const handleKeyPress = (key) => {
    const newValue = inputValue + key
    setInputValue(formatPhoneNumber(newValue))
  }

  const handleDelete = () => {
    setInputValue((prev) => {
      const digits = parsePhoneNumber(prev)
      if (digits.length <= 1) return ""
      return formatPhoneNumber(digits.slice(0, -1))
    })
  }

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
  ]

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <div className="text-3xl font-semibold mb-2">{inputValue || "Enter number"}</div>
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
            {key.letters && <span className="text-xs text-muted-foreground">{key.letters}</span>}
          </Button>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button size="icon" className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600" disabled={!inputValue}>
          <Phone className="h-6 w-6" />
          <span className="sr-only">Call</span>
        </Button>
        {inputValue && (
          <Button size="icon" variant="outline" className="h-16 w-16 rounded-full" onClick={handleDelete}>
            <X className="h-6 w-6" />
            <span className="sr-only">Delete</span>
          </Button>
        )}
        {!inputValue && (
          <Button size="icon" variant="outline" className="h-16 w-16 rounded-full">
            <Mic className="h-6 w-6" />
            <span className="sr-only">Voice</span>
          </Button>
        )}
      </div>
    </div>
  )
}

function AddContactModal({ onClose }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save the contact
    // For now, we just close the modal
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Add New Contact</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={phone} onChange={handlePhoneChange} placeholder="Enter phone number" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Contact</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

