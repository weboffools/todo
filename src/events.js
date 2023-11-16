import DOM from './dom.js';
import { storagePush } from './storage.js';

const dom = DOM();

function upcomingEvent() {
  const upcomingMenuItem = document.querySelector('.upcoming-item');
  const main = dom.getMainElement();

  upcomingMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(dom.upcoming());
    addTaskEvent();
  });
}

function todayEvent() {

  const todayMenuItem = document.querySelector('.today-item');
  const main = dom.getMainElement();
  todayMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(dom.today());
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
        parentE.appendChild(dom.taskForm());
        submitEvent(dom.getTaskForm());
      },
      { once: true },
    );
  });
}

function submitEvent(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    storagePush(e);
  });
}

export { upcomingEvent, submitEvent, todayEvent };
