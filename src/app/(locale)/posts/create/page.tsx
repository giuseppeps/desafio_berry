"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, content }),
		});

		if (response.ok) {
			router.push("/posts");
		} else {
			console.error("Failed to create post");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col">
			<div className="px-4 sm:px-6 lg:px-8">
				<Link
					href="/dashboard"
					className="inline-flex bg-sky-500 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
				>
					← Back to Dashboard
				</Link>
			</div>
			<div className="flex-grow flex items-center justify-center">
				<div className="relative py-3 sm:max-w-xl sm:mx-auto">
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
					<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
						<div className="max-w-md mx-auto">
							<h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700"
									>
										Title
									</label>
									<input
										type="text"
										id="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
									/>
								</div>
								<div>
									<label
										htmlFor="content"
										className="block text-sm font-medium text-gray-700"
									>
										Content
									</label>
									<textarea
										id="content"
										value={content}
										onChange={(e) => setContent(e.target.value)}
										required
										rows={5}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
									></textarea>
								</div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
								>
									Create Post
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
