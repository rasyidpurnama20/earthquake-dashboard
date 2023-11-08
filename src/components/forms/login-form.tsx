"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";

import { loginSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export function LoginForm() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || "/dashboard/playground";
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setLoading(false);
        form.setError("username", {
          type: "manual",
          message: "Username or password is wrong",
        });
        form.setError("password", {
          type: "manual",
          message: "Username or password is wrong",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm rounded-xl">
      <CardHeader className="flex flex-col gap-4">
        {/* <Link href="/">
          <Button
            variant="outline"
            className="flex w-max items-center gap-2 text-sm font-semibold"
          >
            <IconArrowLeft size={20} /> Back to home
          </Button>
        </Link> */}
        <div className="flex justify-center">
          <Image
            src="/images/lapi-logo.svg"
            width={200}
            height={50}
            alt="Lapi Logo"
          />
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-xl font-bold">Login</CardTitle>
          <CardDescription>
            Please enter your credential details
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input your username"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button loading={loading} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
