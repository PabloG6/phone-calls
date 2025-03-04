import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch } from "react";
import { api } from "@/server/react";
import { addContactSchema, AddContactSchema } from "@/routes/contacts/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { PhoneInput } from "./phone-input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
type Props = {
  onOpenChange: Dispatch<React.SetStateAction<boolean | undefined>>;
};
export function AddContactModal({ onOpenChange }: Props) {
  const { mutate: addContact, isPending } =
    api.contacts.addContact.useMutation();
  const utils = api.useUtils();
  const form = useForm<AddContactSchema>({
    resolver: zodResolver(addContactSchema),
    defaultValues: { name: "", phoneNumber: "" },
  });

  const handleSubmit = (
    data: AddContactSchema,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    // Here you would typically save the contact
    // For now, we just close the modal
    addContact(data, {
      onSettled() {
        toast({
          description: "Successfully added contact",
          title: "Added contact",
        });
        onOpenChange(false);
        utils.contacts.list.invalidate();
      },
      onError() {
        toast({
          title: "Something went wrong",
          variant: "destructive",
          description: "Failed to add contact",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="p-4 space-y-4"
      >
        <FormField
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="Enter name" {...field} />
              </FormItem>
            );
          }}
        />

        <FormField
          name="phoneNumber"
          render={({ field }) => {
            return (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <PhoneInput {...field} />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 />} Save Contact
          </Button>
        </div>
      </form>
    </Form>
  );
}
