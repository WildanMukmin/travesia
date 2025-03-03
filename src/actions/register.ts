"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sighUpSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";

export const register = async (value: z.infer<typeof sighUpSchema>) => {
  const validatedFields = sighUpSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { data } = validatedFields;

  const { name, email, password, role, confirmPassword } = data;

  if (password !== confirmPassword) {
    return { error: "Password tidak sama, silahkan coba lagi!" };
  }

  const emailExists = await getUserByEmail(email);
  if (emailExists) {
    return { error: "Email sudah terdaftar!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role ?? undefined,
    },
  });
  revalidatePath(DEFAULT_LOGIN_REDIRECT);
  //   return { message: "Registrasi berhasil, silahkan login" };
  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
