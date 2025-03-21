"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type ForumWithCreator = Prisma.PromiseReturnType<typeof getForum>;

export const getForum = async () => {
  try {
    const forum = await prisma.forum.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        image: true,
        comment: true,
        like: true,
        dislike: true,
      },
    });
    return forum;
  } catch (e) {
    console.log(e);
    return null;
  }
};
