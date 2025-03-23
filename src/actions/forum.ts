"use server";

import { prisma } from "@/lib/prisma";
import { postingForumSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

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

export const postingForum = async (
  data: z.infer<typeof postingForumSchema>,
) => {
  const validatedFields = postingForumSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { content, image, userId } = validatedFields.data;

  if (!content) {
    return { error: "Mohon isi content dengan benar!" };
  }

  if (!userId) {
    return { error: "Terjadi Error Silahkan Login Kembali!" };
  }

  const slug = content
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .slice(0, 500);

  try {
    await prisma.forum.create({
      data: {
        userId,
        slug,
        content,
      },
    });

    revalidatePath("/forum");
    return { success: "Berhasil Posting ke Forum!" };
  } catch (e) {
    return { error: "Terjadi Error Saat mempublikasikan ke Forum" };
  }
};

export const deleteForum = async (id: string) => {
  try {
    await prisma.forum.delete({
      where: {
        id,
      },
    });
    revalidatePath("/forum");
    return { success: "Forum Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error fetching forum:", error);
    return { error: "Gagal Menghapus forum" };
  }
};

export const getOneForum = async (id: string) => {
  try {
    const forum = await prisma.forum.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        image: true,
      },
    });
    return forum;
  } catch (error) {
    console.error("Error fetching forum:", error);
    return null;
  }
};

export const likeForum = async (forumId: string, userId: string) => {
  try {
    const alreadyLiked = await prisma.like.findUnique({
      where: {
        forumId_userId: {
          forumId,
          userId,
        },
      },
    });

    if (alreadyLiked) {
      // Jika sudah like, maka unlike
      await prisma.like.delete({
        where: {
          id: alreadyLiked.id,
        },
      });
      return { success: "Like dibatalkan", unlike: true };
    } else {
      // Pastikan user tidak dislike forum ini
      await prisma.disLike.deleteMany({
        where: { forumId, userId },
      });

      const likeData = await prisma.like.create({
        data: {
          forumId,
          userId,
        },
      });
      return { success: "Forum Berhasil Disukai!", likeData };
    }
  } catch (error) {
    console.error("Error processing like:", error);
    return { error: "Gagal menyukai forum" };
  }
};

export const dislikeForum = async (forumId: string, userId: string) => {
  try {
    const alreadyDisliked = await prisma.disLike.findUnique({
      where: {
        forumId_userId: {
          forumId,
          userId,
        },
      },
    });

    if (alreadyDisliked) {
      // Jika sudah dislike, maka undo dislike
      await prisma.disLike.delete({
        where: {
          id: alreadyDisliked.id,
        },
      });
      return { success: "Dislike dibatalkan", undislike: true };
    } else {
      // Pastikan user tidak like forum ini
      await prisma.like.deleteMany({
        where: { forumId, userId },
      });

      const dislikeData = await prisma.disLike.create({
        data: {
          forumId,
          userId,
        },
      });
      return { success: "Forum Berhasil Dibenci!", dislikeData };
    }
  } catch (error) {
    console.error("Error processing dislike:", error);
    return { error: "Gagal membenci forum" };
  }
};
