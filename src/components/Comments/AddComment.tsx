import { useState } from 'react';

type AddCommentProps = {
	postId: number;
	onCommentAdded: () => void;
};

const AddComment: React.FC<AddCommentProps> = ({ postId, onCommentAdded }) => {
	const [showForm, setShowForm] = useState(false);
	const [content, setContent] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		if (!token) {
			alert('Нужно авторизоваться');
			return;
		}

		const response = await fetch(`/api/wp/v2/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				post: postId,
				content: content,
			}),
		});

		if (response.ok) {
			setContent('');
			onCommentAdded(); // обновляем список комментариев
			setShowForm(false); // скрываем форму
		} else {
			alert('Ошибка при добавлении комментария');
		}
	};

	return (
		<div className='mt-4'>
			{!showForm ? (
				<button
					onClick={() => setShowForm(true)}
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
				>
					Комментировать
				</button>
			) : (
				<form
					onSubmit={handleSubmit}
					className='mt-2 space-y-2 border p-4 rounded shadow'
				>
					<textarea
						value={content}
						onChange={e => setContent(e.target.value)}
						placeholder='Напишите комментарий...'
						className='border p-2 w-full rounded'
						required
					/>
					<div className='flex space-x-2'>
						<button
							type='submit'
							className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'
						>
							Отправить
						</button>
						<button
							type='button'
							onClick={() => setShowForm(false)}
							className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
						>
							Отмена
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default AddComment;
