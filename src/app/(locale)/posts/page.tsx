"use client";

import { useEffect, useState } from "react";
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
} from "@/src/action/posts";
import Modal from "@/src/components/modal";
import Link from "next/link";

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [currentPost, setCurrentPost] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const fetchedPosts = await getPosts();
		setPosts(fetchedPosts);
	}

	async function handleCreatePost(e) {
		e.preventDefault();
		await createPost(title, content);
		setIsCreateModalOpen(false);
		setTitle("");
		setContent("");
		fetchPosts();
	}

	async function handleUpdatePost(e) {
		e.preventDefault();

		if (currentPost) {
			await updatePost(currentPost.id, title, content);
			setIsEditModalOpen(false);
			setCurrentPost(null);
			setTitle("");
			setContent("");
			fetchPosts();
		}
	}
	async function handleDeletePost() {
		if (currentPost) {
			await deletePost(currentPost.id);
			setIsDeleteModalOpen(false);
			setCurrentPost(null);
			fetchPosts();
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="px-4 sm:px-6 lg:px-8">
				<Link
					href="/dashboard"
					className="inline-flex bg-sky-500 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
				>
					← Back to Dashboard
				</Link>
			</div>
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<h1 className="text-2xl font-semibold mb-6">Seus posts</h1>
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
										<button
											onClick={() => {
												setCurrentPost(post);
												setIsEditModalOpen(true);
												setTitle(post.title);
												setContent(post.content);
											}}
											className="text-cyan-600 hover:text-cyan-700 mr-4"
										>
											Editar
										</button>
										<button
											onClick={() => {
												setCurrentPost(post);
												setIsDeleteModalOpen(true);
											}}
											className="text-red-600 hover:text-red-700"
										>
											Excluir
										</button>
									</div>
								</div>
							))}
						</div>
						<div className="mt-8">
							<button
								onClick={() => setIsCreateModalOpen(true)}
								className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
							>
								Crie um novo post
							</button>
						</div>
					</div>
				</div>
			</div>

			<Modal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
			>
				<h2 className="text-2xl font-bold mb-4">Criar novo post</h2>
				<form onSubmit={handleCreatePost}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Título"
						className="w-full p-2 mb-4 border rounded"
					/>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Conteúdo"
						className="w-full p-2 mb-4 border rounded"
						rows={4}
					/>
					<button type="submit" className="bg-cyan-500 text-white p-2 rounded">
						Criar
					</button>
				</form>
			</Modal>

			<Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
				<h2 className="text-2xl font-bold mb-4">Editar post</h2>
				<form onSubmit={handleUpdatePost}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Título"
						className="w-full p-2 mb-4 border rounded"
					/>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Conteúdo"
						className="w-full p-2 mb-4 border rounded"
						rows={4}
					/>
					<button type="submit" className="bg-cyan-500 text-white p-2 rounded">
						Atualizar
					</button>
				</form>
			</Modal>

			<Modal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
			>
				<h2 className="text-2xl font-bold mb-4">Excluir post</h2>
				<p>Tem certeza que deseja excluir este post?</p>
				<div className="mt-4">
					<button
						onClick={handleDeletePost}
						className="bg-red-500 text-white p-2 rounded mr-2"
					>
						Sim, excluir
					</button>
					<button
						onClick={() => setIsDeleteModalOpen(false)}
						className="bg-gray-300 text-black p-2 rounded"
					>
						Cancelar
					</button>
				</div>
			</Modal>
		</div>
	);
}
