document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('new-task-input');
    const list = document.getElementById('todo-list');

    let tasks = [];

    function renderTasks() {
        list.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            if (task.editing) {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = task.text;
                editInput.className = 'todo-edit-input';

                const actions = document.createElement('div');
                actions.className = 'todo-actions';

                const saveBtn = document.createElement('button');
                saveBtn.textContent = 'Save';
                saveBtn.className = 'save-btn';
                saveBtn.onclick = () => saveEdit(index, editInput.value);

                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.className = 'cancel-btn';
                cancelBtn.onclick = () => cancelEdit(index);

                actions.appendChild(saveBtn);
                actions.appendChild(cancelBtn);

                li.appendChild(editInput);
                li.appendChild(actions);
            } else {
                const span = document.createElement('span');
                span.className = 'todo-text';
                span.textContent = task.text;

                const actions = document.createElement('div');
                actions.className = 'todo-actions';

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.className = 'edit-btn';
                editBtn.onclick = () => editTask(index);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => deleteTask(index);

                actions.appendChild(editBtn);
                actions.appendChild(deleteBtn);

                li.appendChild(span);
                li.appendChild(actions);
            }

            list.appendChild(li);
        });
    }

    function addTask(text) {
        tasks.push({ text, editing: false });
        renderTasks();
    }

    function editTask(index) {
        tasks[index].editing = true;
        renderTasks();
    }

    function saveEdit(index, newText) {
        if (newText.trim() === '') return;
        tasks[index].text = newText;
        tasks[index].editing = false;
        renderTasks();
    }

    function cancelEdit(index) {
        tasks[index].editing = false;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value.trim();
        if (value) {
            addTask(value);
            input.value = '';
        }
    });

    renderTasks();
});