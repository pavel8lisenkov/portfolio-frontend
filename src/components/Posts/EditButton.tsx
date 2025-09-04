type EditButtonProps = {
	setIsEditing: (value: boolean) => void;
};

const EditButton: React.FC<EditButtonProps> = ({ setIsEditing }) => {
	return (
		<button
			onClick={() => setIsEditing(true)}
			className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition'
		>
			Редактировать
		</button>
	);
};

export default EditButton;
