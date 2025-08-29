import { useState } from 'react';

type AddPostProps = {
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPost: React.FC<AddPostProps> = ({ setRefresh }) => {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // чтобы форма не перезагружала страницу

		setLoading(true);
		setError(null);
		setSuccess(null);

		const token = localStorage.getItem('token'); // достаём JWT-токен

		if (!token) {
			setError('Вы не авторизованы');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/wp/v2/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, // передаём токен в заголовке
				},
				body: JSON.stringify({
					title,
					content,
					status: 'publish', // можно draft, если нужен черновик
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Ошибка при добавлении поста');
			}

			setSuccess('Пост успешно добавлен ✅');
			setTitle(''); // очищаем форму
			setContent('');
			setRefresh((prev: boolean) => !prev);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Неизвестная ошибка');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg'>
			<h2 className='text-2xl font-bold mb-4 text-gray-800'>Добавить пост</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Заголовок */}
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder='Введите заголовок'
					className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none '
				/>

				{/* Содержание */}
				<input
					type='text'
					value={content}
					onChange={e => setContent(e.target.value)}
					placeholder='Введите содержание'
					className='w-full h-[60px] border border-gray-300 rounded-lg p-2 focus:outline-none '
				/>

				{/* Кнопка */}
				<button
					type='submit'
					disabled={loading}
					className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400'
				>
					{loading ? 'Добавляем...' : 'Добавить'}
				</button>
			</form>

			{/* Ошибки и успех */}
			{error && <p className='text-red-500 mt-3'>{error}</p>}
			{success && <p className='text-green-600 mt-3'>{success}</p>}
		</div>
	);
};

export default AddPost;
