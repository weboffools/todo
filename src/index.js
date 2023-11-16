import './style.css';
import layout from './layout.js';
import { Today } from './main.js';
import Sidebar from './sidebar.js';
import { todayEvent, upcomingEvent } from './events.js';

document.body.appendChild(layout());

const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main-section');

main.appendChild(Today());
sidebar.appendChild(Sidebar().list);

todayEvent();
upcomingEvent();





