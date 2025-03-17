import { auth } from "@/auth";
import { prisma } from "./prisma";

export const currentUser = async () => {
  const data = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: data?.user.id,
    },
  });
  return user;
};

export const currentUserRole = async () => {
  const data = await auth();
  return data?.user.role;
};
