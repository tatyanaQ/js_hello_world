const todoStatuses = {
	toDo: {
		name: 'toDo',
		displayName: 'To Do',
	},
	inProgress: {
		name: 'inProgress',
		displayName: 'In Progress',
	},
	done: {
		name: 'done',
		displayName: 'Done',
	},
};

const todos = [{
	id: 1,
	text: 'Buy a cat',
	status: todoStatuses.done.name,
}, {
	id: 7,
	text: 'Buy 39 more',
	status: todoStatuses.inProgress.name,
}, {
	id: 153,
	text: 'Live happily',
	status: todoStatuses.toDo.name,
}];

function setClassName(element, status) {
	element.className = todoStatuses[status].name;
}

function getTodoDisplayName(todo) {
	return `${todo.text}: ${todoStatuses[todo.status].displayName}`;
}

function createTodoElement({ id, text, status }) {
	const todoElement = document.createElement('li');
	todoElement.id = id;

	const textNode = document.createTextNode(getTodoDisplayName({ text, status }));
	todoElement.appendChild(textNode);

	setClassName(todoElement, status);

	return todoElement;
}

function createTodoList() {
	const todosDom = document.getElementById('todos');
	const todosListDom = document.createElement('ul');

	todos.forEach(todo => {
		const todoElement = createTodoElement(todo);
		todosListDom.appendChild(todoElement);
	});

	todosDom.appendChild(todosListDom);
}