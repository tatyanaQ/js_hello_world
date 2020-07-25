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

todoStatuses.toDo.nextStatus = todoStatuses.inProgress;
todoStatuses.inProgress.nextStatus = todoStatuses.done;
todoStatuses.done.nextStatus = todoStatuses.done;

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

function getTodoById(id) {
	return todos.find(todo => todo.id === id);
}

function getTodoDisplayName(todo) {
	return `${todo.text}: ${todoStatuses[todo.status].displayName}`;
}

function setNextStatus(id) {
	const currentTodo = getTodoById(id);
	currentTodo.status = todoStatuses[currentTodo.status].nextStatus.name;
}

function addListeners(element) {
	element.addEventListener('click', (e) => {
		const { id } = e.target;
		setNextStatus(+id);

		const currentTodo = getTodoById(+id);
		setClassName(e.target, currentTodo.status);

		e.target.innerHTML = getTodoDisplayName(currentTodo);
	});
}

function createTodoElement({ id, text, status }) {
	const todoElement = document.createElement('li');
	todoElement.id = id;

	const textNode = document.createTextNode(getTodoDisplayName({ text, status }))
	todoElement.appendChild(textNode);

	setClassName(todoElement, status);
	addListeners(todoElement);

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