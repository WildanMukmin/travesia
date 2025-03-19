import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type CurrentUser = Prisma.PromiseReturnType<typeof currentUser>;

export const currentUser = async () => {
  const data = await auth();
  if (data) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.user.id,
      },
    });
    return user;
  }
  return null;
};

export const currentUserRole = async () => {
  const data = await auth();
  return data?.user.role;
};
