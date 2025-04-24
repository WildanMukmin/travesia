"use server";

import { prisma } from "@/lib/prisma";
import { postingCommentSchema, postingForumSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import * as z from "zod";
import { updateImageById, uploadImage } from "./image";
import { del } from "@vercel/blob";

export type ForumWithCreator = Prisma.PromiseReturnType<typeof getForum>;
export type OneForumWithCreator = Prisma.PromiseReturnType<typeof getForumById>;
export type AllForum = Prisma.PromiseReturnType<typeof getAllForum>;

export const getForum = async () => {
  try {
    const forum = await prisma.forum.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        image: true,
        comment: {
          include: {
            user: {
              include: {
                image: true,
              },
            },
          },
        },
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

export const getForumById = async (id: string) => {
  try {
    const forum = await prisma.forum.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        image: true,
        comment: {
          include: {
            user: {
              include: {
                image: true,
              },
            },
          },
        },
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

export const getAllForum = async () => {
  try {
    const forum = await prisma.forum.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
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
    const forum = await prisma.forum.create({
      data: {
        userId,
        slug,
        content,
      },
    });

    if (image) {
      const formData = new FormData();
      formData.append("gambar", image);
      formData.append("forumId", forum?.id || "");
      formData.append("namaFoto", image.name);
      const res = await uploadImage(formData);

      if (res.error) {
        return { error: res.error };
      }
    }

    return { success: "Berhasil Posting ke Forum!" };
  } catch (e) {
    return { error: "Terjadi Error Saat mempublikasikan ke Forum" };
  }
};

export const deleteForum = async (id: string) => {
  try {
    const deleteForum = await prisma.forum.delete({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (deleteForum?.image?.gambar) {
      await del(deleteForum.image.gambar);
    }

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

export const commentForum = async (
  data: z.infer<typeof postingCommentSchema>,
) => {
  const validatedFields = postingCommentSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { forumId, userId, pesan } = validatedFields.data;

  if (!forumId || !userId || !pesan) {
    return { error: "Terjadi Error Silahkan Login Kembali!" };
  }

  try {
    const commentData = await prisma.comment.create({
      data: {
        forumId,
        userId,
        pesan,
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
      },
    });
    return { success: "Komentar Berhasil Dibuat!", commentData };
  } catch (error) {
    console.error("Error processing comment:", error);
    return { error: "Gagal membuat komentar" };
  }
};

export const deleteForumById = async (id: string) => {
  try {
    const deleteForum = await prisma.forum.delete({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (deleteForum?.image?.gambar) {
      await del(deleteForum.image.gambar);
    }
    return { success: "Forum Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error fetching forum:", error);
    return { error: "Gagal Menghapus forum" };
  }
};

export const editForumById = async (
  data: z.infer<typeof postingForumSchema>,
  id: string,
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

  if (!id) {
    return { error: "Forum Tidak di temukan" };
  }

  const slug = content
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .slice(0, 500);

  try {
    const forum = await prisma.forum.update({
      where: {
        id,
      },
      data: {
        userId,
        slug,
        content,
      },
      include: {
        image: true,
      },
    });

    if (image && forum?.image?.id) {
      const formData = new FormData();
      formData.append("gambar", image);
      formData.append("forumId", forum?.id || "");
      formData.append("namaFoto", image.name);
      const res = await updateImageById(formData, forum?.image?.id || "");

      if (res.error) {
        return { error: res.error };
      }
    } else if (image && !forum?.image?.id) {
      const formData = new FormData();
      formData.append("gambar", image);
      formData.append("forumId", forum?.id || "");
      formData.append("namaFoto", image.name);
      const res = await uploadImage(formData);

      if (res.error) {
        return { error: res.error };
      }
    }

    return { success: "Berhasil Mengubah Forum!" };
  } catch (e) {
    return { error: "Terjadi Error Saat Mengubah Forum" };
  }
};
