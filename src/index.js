import './style.css';
import layout from './layout.js';
import { Today, Upcoming } from './main.js';
import Sidebar from './sidebar.js';
import { addTaskEvent } from './tasks.js';

document.body.appendChild(layout());

const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main-section');

main.appendChild(Today());
sidebar.appendChild(Sidebar().list);


const upcomingMenuItem = document.querySelector('.upcoming-item');

upcomingMenuItem.addEventListener('click', () => {
  main.replaceChildren();
  main.appendChild(Upcoming());
  addTaskEvent();

});

const todayMenuItem = document.querySelector('.today-item');

todayMenuItem.addEventListener('click', () => {
  main.replaceChildren();
  main.appendChild(Today());
});


