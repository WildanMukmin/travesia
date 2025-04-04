"use server";

import { prisma } from "@/lib/prisma";
import { editProfileMemberSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export type GetProfileType = Prisma.PromiseReturnType<typeof getProfile>;

export type UpdateProfileType = Prisma.PromiseReturnType<typeof updateProfile>;

export const getProfile = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        member: true,
        owner: true,
        image: true,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const updateProfile = async (
  userId: string,
  data: z.infer<typeof editProfileMemberSchema>,
) => {
  try {
    const validatedFields = editProfileMemberSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Mohon isi form dengan benar!" };
    }

    const { name, gender, image } = validatedFields.data;
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });
    if (user.role === "MEMBER") {
      await prisma.member.update({
        where: { userId },
        data: {
          gender,
        },
      });
    }
    revalidatePath("/profile");
    return {
      success:
        "Profile Berhasil Diubah, Silahkan Refresh atau Login Kembali untuk Memperbarui Sesi!",
    };
  } catch (e) {
    return { error: "Terjadi Kesalahan" };
  }
};
