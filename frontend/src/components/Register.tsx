"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [step, setStep] = useState(1);

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
        </div>

        {step === 1 && (
          <>
            <Field>
              <Button variant="outline" type="button" onClick={() => window.location.href = "/google"}>
                <img src="/google.png" alt="Google" className="mr-2 h-4 w-4" />
                Register with Google
              </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </Field>

            <Field>
              <Button type="button" onClick={handleContinue}>
                Continue
              </Button>
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input id="confirmPassword" type="password" required />
            </Field>

            <Field>
              <Button type="submit">Register</Button>
            </Field>
          </>
        )}

        <FieldDescription className="text-center">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Login
          </a>
        </FieldDescription>

      </FieldGroup>
    </form>
  );
}