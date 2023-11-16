import { Today, Upcoming, TaskForm } from './main.js';
import { storagePush } from './storage.js';


function upcomingEvent() {
  const upcomingMenuItem = document.querySelector('.upcoming-item');
  const main = document.querySelector('.main-section');

  upcomingMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(Upcoming());
    addTaskEvent();
  });
}

function todayEvent() {
  const todayMenuItem = document.querySelector('.today-item');
  const main = document.querySelector('.main-section');

  todayMenuItem.addEventListener('click', () => {
    main.replaceChildren();
    main.appendChild(Today());
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
        parentE.appendChild(TaskForm());
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
