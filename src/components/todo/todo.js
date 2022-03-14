import React from 'react';

function Todo({ children, todo, handleDelete, handleCheck }) {
	return (
		<li className='todos__item' style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
			<input className='item__input'
				type='checkbox'
				data-todo-id={todo.id}
				onClick={handleCheck}
				defaultChecked={todo.isCompleted}
			/>
			{children}
			<button className='item__btn' data-todo-id={todo.id} onClick={handleDelete}>
				&times;
			</button>
		</li>
	);
}
export default Todo;