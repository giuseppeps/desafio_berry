import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.id;
  const searchParams = new URL(req.url).searchParams;
  const asc = searchParams.get("asc") === "true";

  try {
    const posts = await prisma.post.findMany({
      where: userId ? { userId: userId } : {},
      orderBy: {
        createdAt: asc ? "asc" : "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
