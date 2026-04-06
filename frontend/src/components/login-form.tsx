"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "@/schemas/auth";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isSubmiting,setIsSubmitting] = useState(false);
  const router = useRouter();
  const { refresh } = useAuth();
  //zod
  const form = useForm<LoginInput>({
    resolver:zodResolver(LoginSchema),
    defaultValues :{
      email:"",
      password:"",
    }
  });
  const onSubmit = async(data:LoginInput) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/login",data); ///api/v1/user/login
      toast.success("You are Successfully Logged In",{
        description: response.data.message
      })
      try {
        // Refresh auth context so client knows user is authenticated
        await refresh();
      } catch (e) {
        // ignore refresh errors; we'll still attempt navigation
      }
      router.replace("/chats");
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error In Login",error)
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Logging Failed";
      toast.error("Logging In Failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required {...form.register("email")} />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="/forgot"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required {...form.register("password")} />
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmiting}>
            {isSubmiting ? "Logging in..." : "Login"} 
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" onClick={() => window.location.href = "/api/user/google"}>
            <img src="/google.png" alt="Google" className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-4">
              Register
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
