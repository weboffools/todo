import { format, add } from 'date-fns';
import { elementClass, inputID, labelFor } from './helpers.js';
import { submitEvent } from './events.js';

function Today() {
  const headingMain = elementClass('div', 'main-heading');
  const headingTitle = elementClass('div', 'main-heading-title');
  headingTitle.textContent = 'Today';
  const headingDate = elementClass('div', 'main-heading-date');
  headingDate.textContent = format(new Date(), 'EE, MMM do');

  headingMain.appendChild(headingTitle);
  headingMain.appendChild(headingDate);

  return headingMain;
}

function Upcoming() {
  const container = elementClass('div', 'days-container');

  for (let i = 0; i < 5; i++) {
    let day = elementClass('div', `day-${i}`);
    day.classList.add('day');
    let today = new Date();

    let dayHead = elementClass('div', 'day-head');
    let dayHeadDOW = elementClass('div', 'weekday');
    let dayHeadMonthDay = elementClass('div', 'month-day');
    dayHeadDOW.textContent = 
      format(add(today, {days: `${i}`}), 'EEEE');
    dayHeadMonthDay.textContent = 
      format(add(today, {days: `${i}`}), 'MMM dd');
    let dayBody = elementClass('div', `day-${i}-body`);
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
  const div = elementClass('div', 'add-task');
  const text = elementClass('div', 'add-task-text');
  const plus = elementClass('div', 'add-task-plus');

  text.textContent = 'Add task';

  div.appendChild(plus);
  div.appendChild(text);

  return div;
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

  submitEvent(form);

  return form;
}
export { Today, Upcoming, TaskForm };
