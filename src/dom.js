import { format, add } from 'date-fns';

function DOM() {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main-section');
  const header = document.querySelector('.header');
  const form = document.querySelector('.add-task-form');

  const getSidebarElement = () => sidebar;
  const getMainElement = () => main;
  const getHeaderElement = () => header;
  const getTaskForm = () => form;

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

  function makeSidebar() {
    const list = helpers.elementClass('ul', 'side-menu');
    const today = helpers.elementClass('li', 'today-item');
    today.textContent = 'Today';
    const upcoming = helpers.elementClass('li', 'upcoming-item');
    upcoming.textContent = 'Upcoming';
    const allTasks = helpers.elementClass('li', 'all-tasks');
    allTasks.textContent = 'All Tasks';

    for (let item of [today, upcoming, allTasks]) {
      list.appendChild(item);
    }

    return { list, today, upcoming, allTasks };
  }

  function makeToday() {
    const headingMain = helpers.elementClass('div', 'main-heading');
    const headingTitle = helpers.elementClass('div', 'main-heading-title');
    headingTitle.textContent = 'Today';
    const headingDate = helpers.elementClass('div', 'main-heading-date');
    headingDate.textContent = format(new Date(), 'EE, MMM do');

    headingMain.appendChild(headingTitle);
    headingMain.appendChild(headingDate);

    return headingMain;
  }

  function upcoming() {
    const container = helpers.elementClass('div', 'days-container');

    for (let i = 0; i < 5; i++) {
      let day = helpers.elementClass('div', `day-${i}`);
      day.classList.add('day');
      let today = new Date();

      let dayHead = helpers.elementClass('div', 'day-head');
      let dayHeadDOW = helpers.elementClass('div', 'weekday');
      let dayHeadMonthDay = helpers.elementClass('div', 'month-day');
      dayHeadDOW.textContent = format(add(today, { days: `${i}` }), 'EEEE');
      dayHeadMonthDay.textContent = format(
        add(today, { days: `${i}` }),
        'MMM dd',
      );
      let dayBody = helpers.elementClass('div', `day-${i}-body`);
      dayBody.appendChild(addTask());
      dayHead.appendChild(dayHeadDOW);
      dayHead.appendChild(dayHeadMonthDay);
      day.appendChild(dayHead);

      day.appendChild(dayBody);
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

  function taskForm() {
    const form = helpers.elementClass('form', 'add-task-form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');

    const taskNameLabel = helpers.labelFor('task_name', 'Task Name');
    const taskName = helpers.inputID('task_name', 'text', 'task_name');

    const taskDescrLabel = helpers.labelFor('task_descr', 'Description');
    const taskDescr = document.createElement('textarea');
    taskDescr.setAttribute('id', 'task_descr');
    taskDescr.setAttribute('name', 'task_descr');

    const dueDateLabel = helpers.labelFor('due_date', 'Due Date');
    const dueDate = helpers.inputID('due_date', 'date', 'due_date');
    const priorityLabel = helpers.labelFor('priority', 'Priority');
    const priority = helpers.inputID('priority', 'radio', 'priority');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';

    form.appendChild(taskNameLabel);
    form.appendChild(taskName);
    form.appendChild(taskDescrLabel);
    form.appendChild(taskDescr);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDate);
    form.appendChild(priorityLabel);
    form.appendChild(priority);
    form.appendChild(submitButton);

    return form;
  }

  return {
    layout,
    makeToday,
    upcoming,
    makeSidebar,
    taskForm,
    addTask,
    getMainElement,
    getHeaderElement,
    getSidebarElement,
    getTaskForm,
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

  return { elementClass, inputID, labelFor };
}

export default DOM;
