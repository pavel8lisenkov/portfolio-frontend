import React, { useEffect, useState } from 'react';

type LoginPageProps = {
	onLoginSuccess: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState<string | null>(null);

	// При загрузке страницы проверяем localStorage
	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) setToken(savedToken);
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(
				'http://localhost:8888/wordpress/wp-json/jwt-auth/v1/token',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password }),
				}
			);

			const data = await response.json();

			if (response.ok && data.token) {
				localStorage.setItem('token', data.token);
				setToken(data.token); // ✅ обновляем состояние
				onLoginSuccess();
			} else {
				alert('Ошибка авторизации');
			}
		} catch (error) {
			console.error(error);
			alert('Ошибка соединения');
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setToken(null);
	};

	return (
		<div className='p-4'>
			{!token ? (
				// Форма отображается только если токена нет
				<div>
					<h2 className='text-xl mb-4'>Вход</h2>
					<form onSubmit={handleLogin}>
						<input
							type='text'
							placeholder='Логин'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='border p-2 mb-2 block w-full'
						/>
						<input
							type='password'
							placeholder='Пароль'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='border p-2 mb-2 block w-full'
						/>
						<button
							type='submit'
							className='bg-blue-500 text-white px-4 py-2 rounded'
						>
							Войти
						</button>
					</form>
				</div>
			) : (
				// Приветствие показывается, если токен есть
				<div>
					<h2 className='text-xl mb-4'>Добро пожаловать!</h2>
					<button
						onClick={handleLogout}
						className='bg-red-500 text-white px-4 py-2 rounded'
					>
						Выйти
					</button>
				</div>
			)}
		</div>
	);
};

export default LoginPage;
