"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { LoginFormSchema, type LoginFormSchemaType } from "@/schema/zod-schema";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormSchemaType) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      } as any);

      if (!res) throw new Error("Login failed");
      if ((res as any).error) throw new Error((res as any).error);

      const session = await getSession();
      const role = (session as any)?.user?.role;

      return role;
    },

    onSuccess: (role) => {
      if (role === "ADMIN") router.push("/admin/dashboard");
      else router.push("/staff/dashboard");
    },

    onError: (err: any) => {
      alert(err?.message || "Login failed");
    },
  });

  function onSubmit(data: LoginFormSchemaType) {
    loginMutation.mutate(data);
  }

  return (
    <Card className="w-5xl h-[50vh] sm:max-w-md md:max-w- justify-center ">
      <CardHeader>
        <CardTitle className="text-center ">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="enter email address"
                  autoComplete="email"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-password">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  type="password"
                  autoComplete="current-password"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full">
          <Button
            type="submit"
            form="form-rhf-input"
            disabled={loginMutation.isPending}
            className="text-center w-full"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
