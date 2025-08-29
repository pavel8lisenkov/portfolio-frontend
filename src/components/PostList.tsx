import React, { useEffect, useState } from 'react';
import type { Post } from '../types.ts';

type PostListProps = {
	refresh: boolean;
};

const PostList: React.FC<PostListProps> = ({ refresh }) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch('/api/wp/v2/posts?per_page=4')
			.then(res => res.json())
			.then((data: Post[]) => {
				setPosts(data);
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
				setLoading(false);
			});
	}, [refresh]);

	if (loading) return <p className='text-center mt-10'>Загрузка...</p>;

	return (
		<div className='grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3'>
			{posts.map(post => (
				<div
					key={post.id}
					className='p-4 border rounded shadow hover:shadow-lg transition'
				>
					<h2
						className='text-xl font-bold mb-2'
						dangerouslySetInnerHTML={{ __html: post.title.rendered }}
					/>
					<div
						className='text-gray-700'
						dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
					/>
				</div>
			))}
		</div>
	);
};

export default PostList;
