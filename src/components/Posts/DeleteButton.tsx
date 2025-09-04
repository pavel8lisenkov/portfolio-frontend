type DeleteButtonProps = {
	handleDelete: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleDelete }) => {
	return (
		<button
			onClick={handleDelete}
			className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition'
		>
			Удалить
		</button>
	);
};

export default DeleteButton;
