import './style.css';
import layout from './layout.js';
import { Today, Upcoming } from './main.js';
import plusCircle from './images/plus-circle.svg';
import Sidebar from './sidebar.js';

document.body.appendChild(layout());

const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main-section');
const header = document.querySelector('.header');

main.appendChild(Today());
sidebar.appendChild(Sidebar().list);


const upcomingMenuItem = document.querySelector('.upcoming-item');

upcomingMenuItem.addEventListener('click', () => {
  main.replaceChildren();
  main.appendChild(Upcoming());
});

const todayMenuItem = document.querySelector('.today-item');

todayMenuItem.addEventListener('click', () => {
  main.replaceChildren();
  main.appendChild(Today());
});



