import { elementClass } from './helpers.js';

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
    task.addEventListener('click', (e) => {
      console.log(e.currentTarget);
    });
  });
}

export { addTask, addTaskEvent };


