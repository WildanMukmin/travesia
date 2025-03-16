"use server";

import { prisma } from "@/lib/prisma";
import { buatReservasiSchema } from "@/lib/zod";
import { Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export type GetProfileType = Prisma.PromiseReturnType<typeof getProfile>;

export type UpdateProfileType = Prisma.PromiseReturnType<typeof updateProfile>;

export const getProfile = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        member: true,
        owner: true,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const updateProfile = async (userId: string) => {};
