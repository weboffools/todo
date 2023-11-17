import DOM from './dom.js';
import ManageStorage from './storage.js';
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
    main.appendChild(DOM().makeToday());
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

function addProjectEvent() {
  const projects = document.querySelectorAll('.add-project');

  projects.forEach((project) => {
    project.addEventListener(
      'click',
      (e) => {
        const parentE = e.currentTarget.parentElement;
        parentE.replaceChildren();
        parentE.appendChild(DOM().projectForm());
        submitEvent(DOM().getProjectForm());
      },
      { once: true },
    );
  });
}

function submitEvent(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = new Task(
      e.target.task_name.value,
      e.target.task_descr.value,
      e.target.due_date.value,
      e.target.priority.value,
      e.target.project.value);
    ManageStorage().addToStore(task);
  });
}

export { upcomingEvent, submitEvent, todayEvent, addProjectEvent };
