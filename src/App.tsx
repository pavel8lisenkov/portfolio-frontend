import React, { useEffect, useState } from 'react';
import AddPost from './components/AddPost';
import LoginPage from './components/LoginPage';
import PostList from './components/PostList';

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		// Проверяем токен в localStorage
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token'); // удаляем токен
		setIsAuthenticated(false); // переключаем экран на логин
	};

	return (
		<div className='p-4'>
			{isAuthenticated ? (
				<div>
					<button
						onClick={handleLogout}
						className='bg-red-500 text-white px-4 py-2 rounded mb-4'
					>
						Выйти
					</button>
					<PostList refresh={refresh} />
					<AddPost setRefresh={setRefresh} />
				</div>
			) : (
				<LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
			)}
		</div>
	);
};

export default App;
