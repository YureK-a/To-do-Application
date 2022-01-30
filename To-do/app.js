const formAddTodo = document.querySelector('[data-add-todo="form-add-todo"]')
const todosContainer = document.querySelector('[data-todos-container="todos-container"]')
const formSearch = document.querySelector('.form-search')
const todosNumberLi = document.querySelector('[data-js="todo-number"]')

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach(todo => {
    todo.classList.add(classToAdd)
    todo.classList.remove(classToRemove)
  })
}

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodos : !matchedTodos
  })

const hideTodos = (todos, inputValue) => {
  const todosToHide = filterTodos(todos, inputValue, false)
  manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
  const todosToShow = filterTodos(todos, inputValue, true)
  manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const addTodos = inputValue => {
  if (inputValue.length) {
    const todoToAdd = `
    <li data-todo="${inputValue}" class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i data-remove="${inputValue}" class="far fa-trash-alt"></i>
    </li>
    `

    todosContainer.innerHTML+= todoToAdd
  }
}

const removeTodos = clickedElement => {
  const removeDataValue = clickedElement.dataset.remove
  const elementToDelete = document.querySelector(`[data-todo="${removeDataValue}"]`)

  if (removeDataValue) {
    elementToDelete.remove()
  }
}

formAddTodo.addEventListener('submit', e => {
  e.preventDefault()

  const inputValue = e.target.add.value

  addTodos(inputValue)

  e.target.reset()
})

todosContainer.addEventListener('click', e => {
  const clickedElement = e.target
  removeTodos(clickedElement)
})

formSearch.addEventListener('input', e => {
  e.preventDefault()

  const inputValue = e.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue)
  showTodos(todos, inputValue)
})