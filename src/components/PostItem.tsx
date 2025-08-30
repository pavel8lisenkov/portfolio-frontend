// // import React from 'react'
// import { DeleteButton } from './DeleteButton';

// type PostItemProps = {
// 	post: {
// 		id: number;
// 		title: { rendered: string };
// 		content: { rendered: string };
// 		date: string;
// 	};
// 	onDelete: (id: number) => void; // 👈 функция удаления
// };

// const deletePost = () => [
// 	return
// ]
// const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
// 	return (
// 		<div className='border rounded p-S mb-4'>
// 			<h2 className='text-xl font-bold'>{post.title.rendered}</h2>
// 			<div
// 				className='prose max-w-none'
// 				dangerouslySetInnerHTML={{ __html: post.content.rendered }}
// 			/>
// 			<div className='flex justify-between'>
// 				<p className='text-sm text-gray-500'>
// 					{new Date(post.date).toLocaleDateString()}
// 				</p>
// 				<DeleteButton onClick = {() => deletePost()} post={post} />
// 			</div>
// 		</div>
// 	);
// };

// export default PostItem;
