import React, { useState } from 'react';
import AddComment from '../Comments/AddComment';
import CommentList from '../Comments/CommentList';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

type Post = {
	id: number;
	title: { raw: string; rendered: string };
	content: { raw: string; rendered: string };
	date: string;
};

type PostItemProps = {
	post: Post;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

// Функция для удаления HTML-тегов
const stripHtml = (html: string) => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent || '';
};

const PostItem: React.FC<PostItemProps> = ({ post, setRefresh }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(post.title.raw || '');
	const [content, setContent] = useState(stripHtml(post.content.raw));

	const handleSave = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;

		const response = await fetch(`/api/wp/v2/posts/${post.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, content }),
		});

		if (response.ok) {
			setIsEditing(false);
			setRefresh(prev => !prev);
		} else {
			alert('Ошибка при сохранении');
		}
	};

	const handleDelete = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;

		const response = await fetch(`/api/wp/v2/posts/${post.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) setRefresh(prev => !prev);
		else alert('Ошибка при удалении');
	};

	return (
		<div className='border p-4 rounded-lg shadow'>
			{isEditing ? (
				<div className='space-y-4'>
					<div>
						<label className='block font-semibold mb-1 text-gray-700'>
							Заголовок:
						</label>
						<input
							className='border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder='Введите заголовок'
						/>
					</div>

					<div>
						<label className='block font-semibold mb-1 text-gray-700'>
							Текст поста:
						</label>
						<textarea
							className='border border-gray-300 rounded p-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={content}
							onChange={e => setContent(e.target.value)}
							placeholder='Введите текст поста'
						/>
					</div>

					<div className='flex space-x-2'>
						<button
							onClick={handleSave}
							className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition'
						>
							Сохранить
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition'
						>
							Отмена
						</button>
					</div>
				</div>
			) : (
				<>
					<h3 className='text-lg font-bold'>{post.title.rendered}</h3>
					<div
						className='prose'
						dangerouslySetInnerHTML={{ __html: post.content.rendered }}
					/>
					<CommentList postId={post.id} />
					<AddComment
						postId={post.id}
						onCommentAdded={() => setRefresh(prev => !prev)}
					/>
					<div className='flex space-x-2 mt-2'>
						<EditButton setIsEditing={setIsEditing} />
						<DeleteButton handleDelete={handleDelete} />
					</div>
				</>
			)}
		</div>
	);
};

export default PostItem;
