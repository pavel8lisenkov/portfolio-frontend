import { useState } from 'react'

const DeleteButton = () => {
	const [posts, setPosts ] = useState ()
	return       <button
        onClick={() => onDelete(post.id)}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Удалить
      </button>

export default DeleteButton;
