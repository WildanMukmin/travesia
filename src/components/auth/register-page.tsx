"use client";

import { Computer, EyeIcon, EyeOffIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";
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
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSuccess } from "@/components/auth/form-succsess";
import { FormError } from "@/components/auth/form-error";
import { ImagePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { sighUpSchema } from "@/lib/zod";
import { CardWrapper } from "./card-wrapper";

const RegisterPage = () => {
  // Role Tools
  const [role, setRole] = useState<Role | null>(null);
  const [onSelectRole, setOnSelectRole] = useState<boolean>(true);
  const [onFormRegistration, setOnFormRegistration] = useState<boolean>(false);
  const datas = [
    {
      id: Role.MEMBER,
      title: "Member",
      description: "Daftar sebagai member",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: Role.OWNER,
      title: "Owner",
      description: "Daftar sebagai owner",
      icon: <Computer className="h-5 w-5" />,
    },
  ];
  const handleRoleSelect = (id: Role) => {
    setRole(id);
  };

  // Form Tools
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [logoFile, setLogoFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof sighUpSchema>>({
    resolver: zodResolver(sighUpSchema),
    defaultValues: {
      role: role || null,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSubmit = (data: z.infer<typeof sighUpSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    // if (logoFile) {
    //   data.logo = logoFile
    // }
    startTransition(() => {
      setIsPending(true);
      // registerCompany(data).then((response) => {
      //   setSuccessMessage(response?.message ?? '')
      //   setErrorMessage(response?.error ?? '')
      //   setIsPending(false)
      // })
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="max-w-7xl mx-auto h-[800px] px-4 flex flex-col items-center justify-center">
      {/* Role Section */}
      {onSelectRole && (
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-14">
            Mendaftar Sebagai Member atau Owner?
          </h1>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {datas.map((data) => (
                <button
                  key={data.id}
                  onClick={() => handleRoleSelect(data.id)}
                  className={`relative rounded-lg border-2 p-6 transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 h-60 ${
                    data.id === role
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  type="button"
                  aria-pressed={data.id === role}
                >
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <div
                      className={`rounded-full p-3 transition-colors ${
                        data.id === role ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      {data.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-bold mt-1 text-xl ${
                          data.id === role ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        {data.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm ${
                          data.id === role ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        {data.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-7 flex items-center justify-center">
              <Button
                onClick={() => {
                  setOnSelectRole(false);
                  setOnFormRegistration(true);
                }}
                className="px-8"
                type="button"
                disabled={!role}
              >
                Lanjut
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      {onFormRegistration && (
        <div className="flex gap-4 w-full">
          <CardWrapper
            headerLabel="Daftar Akun"
            description="Lengkapi data untuk mendaftar akun"
            paragraphSwitchButton="Sudah memiliki akun? "
            switchButtonLabel="Sign In"
            switchButtonHref="/login"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={form.formState.isSubmitting}
                            placeholder="Username"
                            className="border-2 border-gray-100 shadow-sm"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              placeholder="********"
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
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={form.formState.isSubmitting}
                              placeholder="********"
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
                  {errorMessage && <FormError message={errorMessage} />}
                  {successMessage && <FormSuccess message={successMessage} />}
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      disabled={form.formState.isSubmitting || isPending}
                      className="w-full bg-slate-500 text-white hover:bg-slate-600 mx-6"
                    >
                      {isPending ? "Loading..." : "kembali"}
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting || isPending}
                      className="w-full bg-green-500 text-white hover:bg-green-600 mx-6"
                    >
                      {isPending ? "Loading..." : "lanjut"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardWrapper>
          <div className="w-full bg-black">constoh</div>
        </div>
      )}
    </main>
  );
};

export default RegisterPage;
