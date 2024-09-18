"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/modules/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormSelect } from "@/components/modules/form-select";

const formSchema = z.object({
  username: z.string().min(2).max(10),
  password: z.string().min(6).max(10),
  drink: z.enum(["vodka", "jin", "whiskey"]),
});

type Schema = z.infer<typeof formSchema>;

export function AuthForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      drink: "vodka",
    },
  });

  function onSubmit(values: Schema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput<Schema> label="User Name" name="username" form={form} />
            <TextInput<Schema>
              label="Password"
              type="password"
              name="password"
              form={form}
            />
            <FormSelect
              form={form}
              name="drink"
              label="Select your drink"
              options={[
                { value: "vodka", label: "Vodka" },
                { value: "jin", label: "Jin" },
                { value: "whiskey", label: "Whiskey" },
              ]}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
