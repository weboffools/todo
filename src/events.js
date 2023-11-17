import DOM from './dom.js';
import { storagePush } from './storage.js';
import Task from './task.js';
import Project from './project.js';

function upcomingEvent() {
  const upcomingMenuItem = document.querySelector('.upcoming-item');
  const main = DOM().getMainElement();

  upcomingMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(DOM().upcoming());
    addTaskEvent();
  });
}

function todayEvent() {

  const todayMenuItem = document.querySelector('.today-item');
  const main = DOM().getMainElement();
  todayMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(DOM().today());
  });
}

function addTaskEvent() {
  const tasks = document.querySelectorAll('.add-task');

  tasks.forEach((task) => {
    task.addEventListener(
      'click',
      (e) => {
        const parentE = e.currentTarget.parentElement;
        parentE.replaceChildren();
        parentE.appendChild(DOM().taskForm());
        submitEvent(DOM().getTaskForm());
      },
      { once: true },
    );
  });
}

function submitEvent(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.task_name.value;
    const descr = e.target.task_descr.value;
    const due = e.target.due_date.value;
    const priority = e.target.priority.value;
    const project = e.target.project.value;

    storagePush(Task(name, descr, due, priority), project);
  });
}

export { upcomingEvent, submitEvent, todayEvent };
