"use server";

import { prisma } from "@/lib/prisma";
import { postingBlogSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export type BlogWithCreator = Prisma.PromiseReturnType<typeof getBlog>;
export type OneBlogWithCreator = Prisma.PromiseReturnType<typeof getOneBlog>;

export const getBlog = async () => {
  try {
    const blog = await prisma.blog.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
      include: {
        user: true,
        image: true,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export const getOneBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        image: true,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    await prisma.blog.delete({
      where: {
        id,
      },
    });
    revalidatePath("/blog");
    return { success: "Blog Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { error: "Gagal Menghapus Blog" };
  }
};

export const updateBlog = async (
  id: string,
  data: z.infer<typeof postingBlogSchema>,
) => {
  const validatedFields = postingBlogSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { title, content, image, userId } = validatedFields.data;

  if (!title || !content) {
    return { error: "Mohon isi form dengan benar!" };
  }

  if (!userId) {
    return { error: "Terjadi Error Silahkan Login Kembali!" };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  try {
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        userId,
        slug,
      },
    });

    return { success: "Blog Berhasil DIubah!" };
  } catch (e) {
    return { error: "Terjadi Error Saat Mengubah Blog" };
  }
};

export const postingBlog = async (data: z.infer<typeof postingBlogSchema>) => {
  const validatedFields = postingBlogSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { title, content, image, userId } = validatedFields.data;

  if (!title || !content) {
    return { error: "Mohon isi form dengan benar!" };
  }

  if (!userId) {
    return { error: "Terjadi Error Silahkan Login Kembali!" };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  try {
    await prisma.blog.create({
      data: {
        title,
        content,
        userId,
        slug,
      },
    });

    revalidatePath("/blog");
    return { success: "Blog Berhasil Dibuat!" };
  } catch (e) {
    return { error: "Terjadi Error Saat mempublikasikan Blog" };
  }
};
