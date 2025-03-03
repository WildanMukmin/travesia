"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { signInSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: "Akun tidak terdaftar!" };
  }

  //   if (!existingUser.emailVerified) {
  //     await generateVerificationToken(existingUser.email)
  //     return { success: 'Confirmation Email Sent!' }
  //   }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log("Login berhasil");
    return;
  } catch (e) {
    console.log("Login Error:", e);
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Akun tidak terdaftar!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw e;
  }
};
