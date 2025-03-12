"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type OwnerWithDestinasi = Prisma.PromiseReturnType<
  typeof getOwnerDestinasi
>;

export const getOwnerDestinasi = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        owner: {
          include: {
            destinasi: true,
          },
        },
      },
    });
    return user;
  } catch {
    return null;
  }
};
