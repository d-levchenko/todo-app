import '../css/styles.css';
import { refs } from './refs';
import { STORAGE_KEY } from './storage';
import light from '../assets/icon-sun.svg';
import dark from '../assets/icon-moon.svg';

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY.TODO)) || [];
let currentFilter = 'all';

let theme = localStorage.getItem(STORAGE_KEY.THEME_KEY) || 'light';

function saveTodos() {
  localStorage.setItem(STORAGE_KEY.TODO, JSON.stringify(todos));
}

function updateCounter() {
  const activeCount = todos.filter(todo => !todo.completed).length;
  refs.todoCounter.textContent = activeCount;
}

function getFilteredTodos() {
  if (currentFilter === 'active') {
    return todos.filter(todo => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter(todo => todo.completed);
  }

  return todos;
}

function renderTodos() {
  refs.todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.dataset.id = todo.id;

    li.innerHTML = `
      <label class="todo-label">
        <input class="todo-checkbox" type="checkbox" ${
          todo.completed ? 'checked' : ''
        } />
        <span class="custom-checkbox"></span>
      </label>

      <p class="todo-text ${todo.completed ? 'completed' : ''}">
        ${todo.text}
      </p>

      <button class="todo-delete-btn" type="button"></button>
    `;

    refs.todoList.appendChild(li);
  });

  updateCounter();
}

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.unshift(newTodo);
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );

  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);

  saveTodos();
  renderTodos();
}

function setActiveFilterButton(targetBtn) {
  const buttons = refs.filtersList.querySelectorAll('.filters-button');
  buttons.forEach(button => button.classList.remove('active'));

  targetBtn.classList.add('active');
}

function applyTheme() {
  if (theme === 'light') {
    document.body.classList.add('light');

    refs.filtersWrapper.classList.add('light');
    refs.todoWrapper.classList.add('light');
    refs.creationWrapper.classList.add('light');

    refs.themeIcon.src = dark;
    refs.themeIcon.alt = 'Moon icon';
  } else {
    document.body.classList.remove('light');

    refs.filtersWrapper.classList.remove('light');
    refs.todoWrapper.classList.remove('light');
    refs.creationWrapper.classList.remove('light');

    refs.themeIcon.src = light;
    refs.themeIcon.alt = 'Sun icon';
  }
}

refs.themeBtn.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem(STORAGE_KEY.THEME_KEY, theme);
  applyTheme();
});

refs.todoInput.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;

  const value = refs.todoInput.value.trim();
  if (!value) return;

  addTodo(value);
  refs.todoInput.value = '';
});

refs.creationWrapper.addEventListener('click', e => {
  if (!e.target.classList.contains('todo-checkbox')) return;

  const value = refs.todoInput.value.trim();

  if (!value) {
    e.target.checked = false;
    return;
  }

  addTodo(value);
  refs.todoInput.value = '';

  e.target.checked = false;
});

refs.todoList.addEventListener('click', e => {
  const todoItem = e.target.closest('.todo-item');
  if (!todoItem) return;

  const todoId = Number(todoItem.dataset.id);

  if (e.target.classList.contains('todo-delete-btn')) {
    deleteTodo(todoId);
    return;
  }

  if (e.target.classList.contains('todo-checkbox')) {
    toggleTodo(todoId);
  }
});

refs.clearCompletedBtn.addEventListener('click', clearCompleted);

refs.filtersList.addEventListener('click', e => {
  if (!e.target.classList.contains('filters-button')) return;

  const filter = e.target.textContent.toLowerCase();

  currentFilter = filter;

  setActiveFilterButton(e.target);
  renderTodos();
});

renderTodos();
