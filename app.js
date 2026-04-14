// DOM要素の取得
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// ToDoデータを格納する配列
let todos = [];

// ローカルストレージのキー
const STORAGE_KEY = 'todos';

// ローカルストレージからデータを読み込む
function loadTodos() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

// ローカルストレージにデータを保存する
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ToDoアイテムをレンダリングする
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" data-id="${todo.id}">削除</button>
        `;

        todoList.appendChild(li);
    });
}

// 新しいToDoを追加する
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
}

// ToDoを削除する
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// ToDoの完了状態を切り替える
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// イベントリスナーの設定
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

todoList.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    } else if (e.target.classList.contains('todo-checkbox')) {
        toggleTodo(id);
    }
});

// 初期化
loadTodos();
renderTodos();