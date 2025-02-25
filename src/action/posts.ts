"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPosts() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  return prisma.post.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createPost(title: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  return prisma.post.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  });
}

export async function updatePost(id: string, title: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  return prisma.post.update({
    where: { id },
    data: { title, content },
  });
}

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  return prisma.post.delete({
    where: { id },
  });
}
