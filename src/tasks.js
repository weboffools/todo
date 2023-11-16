import { elementClass, inputID, labelFor } from './helpers.js';

function addTask() {
  const div = elementClass('div', 'add-task');
  const text = elementClass('div', 'add-task-text');
  const plus = elementClass('div', 'add-task-plus');

  text.textContent = 'Add task';

  div.appendChild(plus);
  div.appendChild(text);

  return div;
}

function addTaskEvent() {
  const tasks = document.querySelectorAll('.add-task');

  tasks.forEach((task) => {
    task.addEventListener(
      'click',
      (e) => {
        e.currentTarget.replaceChildren();
        e.currentTarget.appendChild(TaskForm());
      },
      { once: true },
    );
  });
}

function TaskForm() {
  const form = elementClass('form', 'add-task-form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '');

  const taskNameLabel = labelFor('task_name', 'Task Name');
  const taskName = inputID('task_name', 'text', 'task_name');

  const taskDescrLabel = labelFor('task_descr', 'Description');
  const taskDescr = document.createElement('textarea');
  taskDescr.setAttribute('id', 'task_descr');
  taskDescr.setAttribute('name', 'task_descr');

  const dueDateLabel = labelFor('due_date', 'Due Date');
  const dueDate = inputID('due_date', 'date', 'due_date');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Submit';

  form.appendChild(taskNameLabel);
  form.appendChild(taskName);
  form.appendChild(taskDescrLabel);
  form.appendChild(taskDescr);
  form.appendChild(dueDateLabel);
  form.appendChild(dueDate);
  form.appendChild(submitButton);


  return form;
}

export { addTask, addTaskEvent, TaskForm };