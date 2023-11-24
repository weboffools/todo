import DOM from './dom.js';
import ManageStorage from './storage.js';
import Task from './task.js';
import Project from './project.js';

function upcomingEvent() {
  const upcomingMenuItem = document.querySelector('.upcoming-item');
  const main = DOM().getMainElement();

  upcomingMenuItem.addEventListener('click', () => {
    replaceMain(DOM().upcoming(), main);
    DOM().refreshTaskArea(DOM().getTaskAreas());
  });
}

function replaceMain(page, area) {
  area.replaceChildren();
  area.appendChild(page);
  DOM().refreshTaskArea(DOM().getTaskAreas());
}

function todayEvent() {
  const todayMenuItem = document.querySelector('.today-item');
  const main = DOM().getMainElement();
  todayMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(DOM().makeToday());
    DOM().refreshTaskArea(DOM().getTaskAreas());
  });
}

function addTaskEvent() {
  const tasks = document.querySelectorAll('.add-task');

  tasks.forEach((task) => {
    task.addEventListener('click', (e) => {
      const current = e.currentTarget;
      addRemoveForm(current);
    });
  });
}

function addRemoveForm(current) {
  let form = document.querySelector('.add-task-form');
  if (form === null) {
    current.replaceWith(DOM().taskForm());
    let form = DOM().getTaskForm();
    form.firstChild.focus();
    submitEvent(form);
  } else {
    form.replaceWith(DOM().addTask());
    current.replaceWith(DOM().taskForm());
    form = DOM().getTaskForm();
    form.firstChild.focus();
    submitEvent(form);
    replaceMain(DOM().upcoming(), DOM().getMainElement());
  }
}

function addProjectEvent() {
  const projects = document.querySelectorAll('.add-project');

  projects.forEach((project) => {
    project.addEventListener(
      'click',
      (e) => {
        e.currentTarget.replaceWith(DOM().projectForm());
        newProjectEvent(DOM().getProjectForm());
      },
      { once: true },
    );
  });
}

function submitEvent(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskarea = DOM().getTaskAreas();
    const task = new Task(
      e.target.task_name.value,
      e.target.task_descr.value,
      e.target.due_date.value,
      e.target.priority.value,
      e.target.project.value,
    );
    ManageStorage().addToStore(task);
    ManageStorage().addTaskToProject(task.project, task.fullKey);
    DOM().refreshTaskArea(taskarea);
  });
}

function newProjectEvent(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const project = new Project(e.target.project_name.value);
    ManageStorage().addToStore(project);
    DOM().refreshSidebar();
  });
}

function checkOffTask() {
  const checkButton = document.querySelectorAll('.check-off');

  checkButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      let id = e.target.parentElement.dataset.taskId;
      let task = JSON.parse(localStorage.getItem(id));
      let project = task.project;
      ManageStorage().removeTaskFromProject(project, id);
      localStorage.removeItem(id);
      let taskarea = DOM().getTaskAreas();
      DOM().refreshTaskArea(taskarea);
    });
  });
}

function editTask() {
  const taskCard = document.querySelectorAll('.task-card');

  taskCard.forEach((card) => {
    card.addEventListener('click', (e) => {
      const key = e.currentTarget.dataset.taskId;
      const task = localStorage.getItem(key);
      console.log(JSON.parse(task));
    });
  });
}


export { upcomingEvent, submitEvent, todayEvent, addProjectEvent, addTaskEvent, checkOffTask, editTask };
