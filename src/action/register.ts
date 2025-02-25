"use server";

import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(name: string, email: string, password: string) {
  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, user: { name: user.name, email: user.email } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
