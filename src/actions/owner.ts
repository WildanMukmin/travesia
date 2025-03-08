"use server";

import { prisma } from "@/lib/prisma";

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
