import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("POST request received", req);
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content } = await req.json();
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: session.user?.id,
      },
    });

    console.log("Created post:", post);

    return NextResponse.json({ post });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
