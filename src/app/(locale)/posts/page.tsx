import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Posts() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	const posts = await prisma.post.findMany({
		where: {
			authorId: session.user?.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold mb-6">Your Posts</h1>
						</div>
						<div className="divide-y divide-gray-200">
							{posts.map((post) => (
								<div key={post.id} className="py-4">
									<h2 className="text-xl font-medium text-gray-900">
										{post.title}
									</h2>
									<p className="mt-2 text-gray-600">
										{post.content?.substring(0, 100)}...
									</p>
									<div className="mt-4">
										<Link
											href={`/posts/${post.id}`}
											className="text-cyan-600 hover:text-cyan-700 mr-4"
										>
											View
										</Link>
										<Link
											href={`/posts/${post.id}/edit`}
											className="text-cyan-600 hover:text-cyan-700"
										>
											Edit
										</Link>
									</div>
								</div>
							))}
						</div>
						<div className="mt-8">
							<Link
								href="/posts/create"
								className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
							>
								Create New Post
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
