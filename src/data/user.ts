import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type AllUsers = Prisma.PromiseReturnType<typeof getAllUser>;

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
export const getAllUser = async () => {
  try {
    const user = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return user;
  } catch {
    return null;
  }
};
