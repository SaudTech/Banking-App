"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AuthFormField from "./AuthFormField";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formAuthFormSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formAuthFormSchema>>({
    resolver: zodResolver(formAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      city: "",
      address1: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formAuthFormSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(values);
        setUser(newUser);
      } else {
        const user = await signIn({
          email: values.email,
          password: values.password,
        }); 

        if(user) router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/dashboard"
          className="mb-12 flex cursor-pointer items-center gap-2"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="HorizonLogo"
            className="size-[24px] xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your bank account to get started"
              : "Enter your details below"}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink Component */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <AuthFormField
                      control={form.control}
                      fieldName="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <AuthFormField
                      control={form.control}
                      fieldName="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <AuthFormField
                    control={form.control}
                    fieldName="city"
                    label="City"
                    placeholder="Enter your City"
                  />
                  <AuthFormField
                    control={form.control}
                    fieldName="address1"
                    label="Address"
                    placeholder="Enter your addres"
                  />
                  <div className="flex gap-4">
                    <AuthFormField
                      control={form.control}
                      fieldName="state"
                      label="State"
                      placeholder="Enter your state"
                    />
                    <AuthFormField
                      control={form.control}
                      fieldName="postalCode"
                      label="Postal Code"
                      placeholder="Enter your postal code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <AuthFormField
                      control={form.control}
                      fieldName="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <AuthFormField
                      control={form.control}
                      fieldName="ssn"
                      label="SSN"
                      placeholder="Social Security number"
                    />
                  </div>
                </>
              )}

              <AuthFormField
                control={form.control}
                fieldName="email"
                label="Email"
                placeholder="Enter your email"
              />
              <AuthFormField
                control={form.control}
                fieldName="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-400">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
