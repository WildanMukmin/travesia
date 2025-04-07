"use server";

import { prisma } from "@/lib/prisma";
import { postingBlogSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import * as z from "zod";
import { updateImageById, uploadImage } from "./image";
import { del } from "@vercel/blob";

export type BlogWithCreator = Prisma.PromiseReturnType<typeof getBlog>;
export type OneBlogWithCreator = Prisma.PromiseReturnType<typeof getOneBlog>;
export type AllBlog = Prisma.PromiseReturnType<typeof getAllBlog>;

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

export const getAllBlog = async () => {
  const blog = prisma.blog.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return blog;
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
    const deleteBlog = await prisma.blog.delete({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });
    if (deleteBlog?.image?.gambar) {
      await del(deleteBlog.image.gambar);
    }
    return { success: "Blog Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { error: "Gagal Menghapus Blog" };
  }
};

export const updateBlog = async (
  id: string,
  data: z.infer<typeof postingBlogSchema>
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
    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        userId,
        slug,
      },
      include: {
        image: true,
      },
    });

    const formData = new FormData();
    formData.append("gambar", image || "");
    formData.append("blogId", id);
    formData.append("namaFoto", image?.name || "");
    if (!blog.image?.id) {
      return { error: "Terjadi Error Saat Mengubah Blog1" };
    }
    if (image) {
      const res = await updateImageById(formData, blog.image?.id);
      if (res?.error) {
        return { error: res.error };
      }
    }
    return { success: "Blog Berhasil DIubah!" };
  } catch (e) {
    return { error: "Terjadi Error Saat Mengubah Blog3" };
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

  if (!image) {
    return { error: "Mohon isi gambar dengan benar!" };
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
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        userId,
        slug,
      },
    });

    const formData = new FormData();
    formData.append("gambar", image);
    formData.append("blogId", blog?.id || "");
    formData.append("namaFoto", image.name);

    await uploadImage(formData).then((res) => {
      if (res.error) {
        return { error: "Terjadi Error Saat mempublikasikan Blog" };
      }
    });

    return { success: "Blog Berhasil Dibuat!" };
  } catch (e) {
    return { error: "Terjadi Error Saat mempublikasikan Blog" };
  }
};

export const deleteBlogById = async (id: string) => {
  try {
    const deleteBlog = await prisma.blog.delete({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (deleteBlog?.image?.gambar) {
      await del(deleteBlog.image.gambar);
    }

    return { success: "Blog Berhasil Dihapus!" };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { error: "Gagal Menghapus Blog" };
  }
};
