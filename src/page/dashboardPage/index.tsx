"use client";

import Link from "next/link";

export default function Dashboard({ session }: { session: any }) {
	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold">
								Welcome to your Dashboard, {session?.user?.name}!
							</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
								<p>You can manage your posts here.</p>
								<ul className="list-disc space-y-2">
									<li className="flex items-start">
										<span className="h-6 flex items-center sm:h-7">
											<svg
												className="flex-shrink-0 h-5 w-5 text-cyan-500"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
										<p className="ml-2">
											<Link
												href="/posts/create"
												className="text-cyan-600 hover:text-cyan-700"
											>
												Create a new post
											</Link>
										</p>
									</li>
									<li className="flex items-start">
										<span className="h-6 flex items-center sm:h-7">
											<svg
												className="flex-shrink-0 h-5 w-5 text-cyan-500"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
										<p className="ml-2">
											<Link
												href="/posts"
												className="text-cyan-600 hover:text-cyan-700"
											>
												View all posts
											</Link>
										</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
