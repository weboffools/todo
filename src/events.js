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
  DOM().refreshSidebar();
  
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
    current.replaceWith(DOM().taskForm({ name: 'Task Name', descr: ''}, 'add-task-form'));
    let form = DOM().getTaskForm();
    form.firstChild.focus();
    submitEvent(form);
  } else {
    form.replaceWith(DOM().addTask());
    current.replaceWith(DOM().taskForm({ name: 'Task Name', descr: ''}, 'add-task-form'));
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
    const name = e.target.task_name.value;
    const description = e.target.task_descr.value;
    const date = e.target.due_date.value;
    const priority = e.target.priority.value;
    const project = e.target.project.value;
      
    const task = new Task(
      name,
      description,
      date,
      priority,
      project,
    );
    ManageStorage().addTaskToProject(task.project, task.fullKey);
    ManageStorage().addToStore(task);
    
    DOM().refreshTaskArea(taskarea);
    DOM().refreshSidebar();
  });
}

function editSubmitEvent(form, key, task) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskarea = DOM().getTaskAreas();
    const dialog = document.querySelector('.edit-dialog');
    const name = e.target.task_name.value;
    const description = e.target.task_descr.value;
    const date = e.target.due_date.value;
    const priority = e.target.priority.value;
    const project = e.target.project.value;

    task.name = name;
    task.description = description;
    task.date = date;
    task.priority = priority;
    task.project = project;

    localStorage.setItem(key, JSON.stringify(task));
    DOM().refreshTaskArea(taskarea);
    DOM().refreshSidebar();
    dialog.close();

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
      DOM().refreshSidebar();
    });
  });
}

function editTask() {
  const edits = document.querySelectorAll('.edit-btn');
  edits.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.parentElement.dataset.taskId;
      const task = JSON.parse(localStorage.getItem(key));
      const body = document.querySelector('body');
      const dialog = DOM().editForm(task);
      body.appendChild(dialog);
      const form = document.querySelector('.edit-form');
      editSubmitEvent(form, key, task);
      dialog.showModal();
    });
  });
  
}

function openProject() {
  const items = document.querySelectorAll('.project-list-item');

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      const key = e.currentTarget.dataset.projectId;
      if (e.currentTarget.lastChild.getAttribute('class') !== 'project-task-list') {
        e.currentTarget.append(DOM().makeProjectTaskList(key));
      } else {
        e.currentTarget.lastChild.remove();
      }
    });
  });
}


export { upcomingEvent, submitEvent, todayEvent, addProjectEvent, addTaskEvent, checkOffTask, editTask, openProject };
