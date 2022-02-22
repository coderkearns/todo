const $todosList = document.getElementById("todos")
const $todoForm = document.getElementById("form")
const $todoInput = document.getElementById("form-todo")

const todos = [
	{ todo: "Start using this todo list.", done: false },
	{ todo: "Add javascript.", done: true },
]

function render() {
	$todosList.innerHTML = ""
	$todosList.innerHTML = todos.map(createTodo).join("")
}

function createTodo(todo) {
	return `<li
        class="todo todo-${todo.done ? "checked" : "unchecked"}"
        tabindex="0"
    >
        ${todo.todo}
    </li>`
}

function toggleTodo(event) {
	event.preventDefault()
	event.target.focus()
	if (event.key) if (event.key !== "Enter") return
	if (event.target.classList.contains("todo")) {
		const index = todos.findIndex(t => t.todo === event.target.innerText)
		if (index < 0) return
		todos[index].done = !todos[index].done
		render()
	}
}

function addTodo(event) {
	event.preventDefault()
	todos.push({ todo: $todoInput.value, done: false })
	$todoInput.value = ""
	render()
}

function deleteTodo(event) {
	if (event.key !== "Delete" && event.key !== "d") return
	const index = todos.findIndex(t => t.todo === event.target.innerText)
	if (index < 0) return
	todos.splice(index, 1)
	render()
}

// Whenever a li.todo is clicked, toggle its done state.
$todosList.addEventListener("click", toggleTodo)

// Whenever someone focuses on a li.todo, and presses enter, toggle its done state.
// Delete todos when the delete key is pressed.
$todosList.addEventListener("keypress", e => {
	deleteTodo(e)
	toggleTodo(e)
})

// Add new todos when the form is submitted using enter.
$todoForm.addEventListener("submit", addTodo)

$todosList.addEventListener("keypress", deleteTodo)

render()
