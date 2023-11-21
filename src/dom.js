import { format, add } from 'date-fns';
import ManageStorage from './storage';
import {
  todayEvent,
  upcomingEvent,
  addProjectEvent,
  addTaskEvent,
} from './events.js';

function DOM() {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main-section');
  const header = document.querySelector('.header');
  const tForm = document.querySelector('.add-task-form');
  const proForm = document.querySelector('.add-project-form');
  const taskarea = document.querySelectorAll('.task-container');

  const getSidebarElement = () => sidebar;
  const getMainElement = () => main;
  const getHeaderElement = () => header;
  const getTaskForm = () => tForm;
  const getProjectForm = () => proForm;
  const getTaskAreas = () => taskarea;

  const helpers = Helpers();

  function layout() {
    const container = helpers.elementClass('div', 'container');
    const header = helpers.elementClass('div', 'header');
    const sidebar = helpers.elementClass('div', 'sidebar');
    const main = helpers.elementClass('div', 'main-section');

    container.appendChild(header);
    container.appendChild(sidebar);
    container.appendChild(main);

    return container;
  }

  function makeTaskCard(task) {
    const taskDiv = helpers.elementClass('div', 'task-card');

    const taskName = helpers.elementClass('div', 'task-name-div');
    taskName.textContent = task.name;

    const dueDate = helpers.elementClass('div', 'date-div');
    dueDate.textContent = `Due Date: ${task.date}`;

    const priority = helpers.elementClass('div', 'priority-div');
    priority.textContent = `Priority: ${task.priority.toUpperCase()}`;

    const project = helpers.elementClass('div', 'part-of-project');
    project.textContent = `Project: ${task.project}`;

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(dueDate);
    taskDiv.appendChild(priority);
    taskDiv.appendChild(project);

    return taskDiv;
  }

  function makeSidebar() {
    const container = helpers.elementClass('div', 'side-container');
    const list = helpers.elementClass('ul', 'side-menu');
    const today = helpers.elementClass('li', 'today-item');
    today.textContent = 'Today';
    const upcoming = helpers.elementClass('li', 'upcoming-item');
    upcoming.textContent = 'Upcoming';
    const projects = helpers.elementClass('li', 'projects');
    projects.textContent = 'Projects';

    for (let item of [today, upcoming, projects]) {
      list.appendChild(item);
    }
    container.appendChild(list);
    container.appendChild(makeProjectList());
    container.appendChild(addProject());

    return container;
  }

  function refreshSidebar() {
    const side = getSidebarElement();
    const sideContent = makeSidebar();

    side.replaceChildren(sideContent);
    todayEvent();
    upcomingEvent();
    addProjectEvent();
  }

  function refreshTaskArea(taskarea) {
    if (taskarea.length > 1) {
      taskarea.forEach((task) => {
        console.log(task);
      });
    } else {
      taskarea = taskarea[0];
      makeTaskList(taskarea.dataset.thisDate, taskarea);
      taskarea.appendChild(addTask());
    }
    addTaskEvent();
    return taskarea;
  }

  function makeProjectList() {
    const list = helpers.elementClass('ul', 'project-list');
    const projects = ManageStorage().getProjects();

    for (let item of projects) {
      const li = helpers.elementClass('li', 'project-list-item');
      const div = document.createElement('div');
      const name = document.createElement('span');
      name.textContent = item.name;
      const number = helpers.elementClass('span', 'number');
      number.textContent = item.tasks.length;
      div.appendChild(name);
      div.appendChild(number);
      li.appendChild(div);
      list.appendChild(li);
    }

    return list;
  }

  function makeTaskList(date, area) {
    let tasks = ManageStorage().getTasks();
    let tasksOnThisDate = tasks.filter((task) => task['date'] === date);
    tasksOnThisDate.forEach((task) => {
      let card = makeTaskCard(task);
      area.appendChild(card);
    });
  }

  function makeToday() {
    const date = format(new Date(), 'yyyy-MM-dd');
    const todayContainer = helpers.elementClass('div', 'today-container');
    const headingMain = helpers.elementClass('div', 'main-heading');
    const headingTitle = helpers.elementClass('div', 'main-heading-title');
    headingTitle.textContent = 'Today';
    const headingDate = helpers.elementClass('div', 'main-heading-date');
    headingDate.textContent = format(new Date(), 'EE, MMM do');
    headingMain.appendChild(headingTitle);
    headingMain.appendChild(headingDate);

    const taskContainer = helpers.elementClass('div', 'task-container');
    taskContainer.setAttribute('data-this-date', date);


    todayContainer.appendChild(headingMain);
    todayContainer.appendChild(taskContainer);
    return todayContainer;
  }

  function upcoming() {
    const container = helpers.elementClass('div', 'days-container');

    for (let i = 0; i < 5; i++) {
      let day = helpers.elementClass('div', `day-${i}`);
      day.classList.add('day');
      let today = new Date();
      let thisDay = format(add(today, { days: `${i}` }), 'yyyy-MM-dd');


      let dayHead = helpers.elementClass('div', 'day-head');
      let dayHeadDOW = helpers.elementClass('div', 'weekday');
      let dayHeadMonthDay = helpers.elementClass('div', 'month-day');
      dayHeadDOW.textContent = format(add(today, { days: `${i}` }), 'EEEE');
      dayHeadMonthDay.textContent = format(
        add(today, { days: `${i}` }),
        'MMM dd',
      );
      let taskContent = helpers.elementClass('div', 'task-container');
      taskContent.setAttribute('data-this-date', thisDay);
      taskContent.appendChild(addTask());
      dayHead.appendChild(dayHeadDOW);
      dayHead.appendChild(dayHeadMonthDay);
      day.appendChild(dayHead);

      day.appendChild(taskContent);
      container.appendChild(day);
    }

    return container;
  }

  function addTask() {
    const div = helpers.elementClass('div', 'add-task');
    const text = helpers.elementClass('div', 'add-task-text');
    const plus = helpers.elementClass('div', 'add-task-plus');

    text.textContent = 'Add task';

    div.appendChild(plus);
    div.appendChild(text);

    return div;
  }

  function addProject() {
    const div = helpers.elementClass('div', 'add-project');
    const text = helpers.elementClass('div', 'add-project-text');
    const plus = helpers.elementClass('div', 'add-project-plus');

    text.textContent = 'Add Project';

    div.appendChild(plus);
    div.appendChild(text);

    return div;
  }

  function taskForm() {
    const form = helpers.elementClass('form', 'add-task-form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');

    const taskNameLabel = helpers.labelFor('task_name', 'Task Name');
    const taskName = helpers.inputID('task_name', 'text', 'task_name');
    taskName.setAttribute('required', true);

    const taskDescrLabel = helpers.labelFor('task_descr', 'Description');
    const taskDescr = document.createElement('textarea');
    taskDescr.setAttribute('id', 'task_descr');
    taskDescr.setAttribute('name', 'task_descr');

    const dueDateLabel = helpers.labelFor('due_date', 'Due Date');
    const dueDate = helpers.inputID('due_date', 'date', 'due_date');
    dueDate.setAttribute('value', format(new Date(), 'yyyy-MM-dd'));

    const priorityField = helpers.elementClass('fieldset', 'priority_fieldset');
    const priorityLegend = helpers.elementClass('legend', 'priority_legend');
    priorityLegend.textContent = 'Priority';
    priorityField.appendChild(priorityLegend);

    const high = helpers.elementClass('div', 'form-radio');
    const medium = helpers.elementClass('div', 'form-radio');
    const low = helpers.elementClass('div', 'form-radio');

    const highLabel = helpers.labelFor('high', 'High');
    const highInput = helpers.inputID('high', 'radio', 'priority');
    highInput.setAttribute('value', 'high');
    high.appendChild(highLabel);
    high.appendChild(highInput);

    const medLabel = helpers.labelFor('medium', 'Medium');
    const medInput = helpers.inputID('medium', 'radio', 'priority');
    medInput.setAttribute('value', 'medium');
    medium.appendChild(medLabel);
    medium.appendChild(medInput);

    const lowLabel = helpers.labelFor('low', 'Low');
    const lowInput = helpers.inputID('low', 'radio', 'priority');
    lowInput.setAttribute('value', 'low');
    low.appendChild(lowLabel);
    low.appendChild(lowInput);

    priorityField.appendChild(high);
    priorityField.appendChild(medium);
    priorityField.appendChild(low);

    const projectLabel = helpers.labelFor('project_select', 'Select a Project');
    const projectSelect = document.createElement('select');
    projectSelect.setAttribute('name', 'project');
    projectSelect.setAttribute('id', 'project_select');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', '');
    defaultOption.textContent = '--Choose a Project--';
    projectSelect.appendChild(defaultOption);
    let projectArray = ManageStorage().storageLookup('project', 'type');
    for (let item of projectArray) {
      const name = item.name.toLowerCase();
      const project = helpers.optionValue(`${name}`);
      project.textContent = item.name;
      projectSelect.appendChild(project);
    }

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add Task';

    form.appendChild(taskNameLabel);
    form.appendChild(taskName);
    form.appendChild(taskDescrLabel);
    form.appendChild(taskDescr);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDate);
    form.appendChild(priorityField);
    form.appendChild(projectLabel);
    form.appendChild(projectSelect);
    form.appendChild(submitButton);

    return form;
  }

  function projectForm() {
    const form = helpers.elementClass('form', 'add-project-form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');
    const projectNameLabel = helpers.labelFor('project_name', 'Project Name');
    const projectName = helpers.inputID('project_name', 'text', 'project_name');
    projectName.setAttribute('required', true);
    const button = helpers.elementClass('button', 'add-project-button');
    button.textContent = 'Add Project';
    button.setAttribute('type', 'submit');
    form.appendChild(projectNameLabel);
    form.appendChild(projectName);
    form.appendChild(button);

    return form;
  }

  return {
    layout,
    makeToday,
    upcoming,
    makeSidebar,
    refreshSidebar,
    refreshTaskArea,
    taskForm,
    projectForm,
    addTask,
    makeTaskCard,
    makeTaskList,
    getMainElement,
    getHeaderElement,
    getSidebarElement,
    getTaskAreas,
    getTaskForm,
    getProjectForm,
  };
}

function Helpers() {
  const elementClass = (element, css) => {
    const elem = document.createElement(element);
    elem.classList.add(css);

    return elem;
  };

  const inputID = (id, type, name) => {
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    input.setAttribute('name', name);

    return input;
  };

  const labelFor = (target, text) => {
    const label = document.createElement('label');
    label.setAttribute('for', target);
    label.textContent = text;

    return label;
  };

  const optionValue = (value) => {
    const option = document.createElement('option');
    option.setAttribute('value', value);

    return option;
  };

  return { elementClass, inputID, labelFor, optionValue };
}

export default DOM;
