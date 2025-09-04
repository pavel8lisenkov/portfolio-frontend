import { useState } from 'react';

import { useEffect } from 'react';

type Comment = {
	id: number;
	author_name: string;
	content: { rendered: string };
	date: string;
};

type CommentListProps = {
	postId: number;
};

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		fetch(`/api/wp/v2/comments?post=${postId}`)
			.then(res => res.json())
			.then(data => setComments(data));
	}, [postId]);

	return (
		<div className='mt-4 space-y-2'>
			{comments.map(comment => (
				<div key={comment.id} className='border p-2 rounded'>
					<p className='font-semibold'>{comment.author_name}</p>
					<div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
					<p className='text-gray-500 text-sm'>{comment.date}</p>
				</div>
			))}
		</div>
	);
};

export default CommentList;
