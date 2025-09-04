import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';

type Post = {
	id: number;
	title: { raw: string; rendered: string };
	content: { raw: string; rendered: string };
	date: string;
};

type PostListProps = {
	refresh: boolean;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostList: React.FC<PostListProps> = ({ refresh, setRefresh }) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) throw new Error('Нет токена');

				const response = await fetch('/api/wp/v2/posts?context=edit', {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) throw new Error('Ошибка загрузки постов');

				const data = await response.json();
				setPosts(data);
			} catch (err) {
				setError(`Не удалось загрузить посты. Проверьте токен и права. ${err}`);
			}
		};

		fetchPosts();
	}, [refresh]);

	if (error) return <p>{error}</p>;

	return (
		<div className='space-y-4'>
			{posts.map(post => (
				<PostItem key={post.id} post={post} setRefresh={setRefresh} />
			))}
		</div>
	);
};

export default PostList;
