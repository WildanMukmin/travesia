"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSuccess } from "@/components/auth/form-succsess";
import { FormError } from "@/components/auth/form-error";
import * as z from "zod";
import { signInSchema } from "@/lib/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import Image from "next/image";
import { login } from "@/actions/login";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  const handleSubmit = (data: z.infer<typeof signInSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true);
    startTransition(() => {
      login(data).then((data) => {
        setErrorMessage(data?.error ?? "");
        setSuccessMessage("");
        setIsPending(false);
      });
    });
  };
  return (
    <main className="max-w-7xl mx-auto h-[800px] px-4 flex flex-col items-center justify-center">
      {successMessage && <FormSuccess message={successMessage} />}
      <div className="flex flex-col md:flex-row-reverse gap-4 w-full">
        <CardWrapper
          headerLabel="Selamat Datang!"
          description="Lengkapi data untuk masuk ke akun anda!"
          paragraphSwitchButton="Belum memiliki akun? "
          switchButtonLabel="Daftar"
          switchButtonHref="/register"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={form.formState.isSubmitting}
                          placeholder="Enter an email address"
                          className="border-2 border-gray-100 shadow-sm"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={form.formState.isSubmitting}
                            placeholder="Password"
                            className="border-2 border-gray-100 shadow-sm"
                            type={showPassword ? "text" : "password"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-3/4 -translate-y-1/2"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="link"
                    className="p-0 text-green-500 hover:text-green-600"
                  >
                    {/* <Link href={"/forgot-password"}>Forgot Password?</Link> */}
                  </Button>
                </div>
                {errorMessage && <FormError message={errorMessage} />}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                >
                  {isPending ? "Memuat..." : "Masuk"}
                </Button>
              </div>
            </form>
          </Form>
        </CardWrapper>
        <div className="w-full max-w-4xl">
          <div className="rounded-xl overflow-hidden relative">
            <Image
              src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Travesia Adventure"
              className="w-full h-full blur-[2px]"
              width={900}
              height={500}
              objectFit="cover"
              priority
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center w-full bg-gradient-to-b from-black/100 to-black/0 hover:to-black/50 transition p-6 h-full">
              <h1 className="text-white text-3xl md:text-5xl mt-6 font-bold">
                TRAVESIA
              </h1>
              <p className="text-gray-200 text-lg mt-4 px-3">
                Travesia adalah sistem digital yang dirancang untuk
                menghubungkan para pecinta petualangan alam dengan destinasi,
                komunitas, event, dan perlengkapan terbaik, sekaligus
                menyediakan platform untuk berbagi pengalaman, dan tips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
