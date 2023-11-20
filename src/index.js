import './style.css';
import DOM from './dom.js';
import { todayEvent, upcomingEvent, addProjectEvent, addTaskEvent } from './events.js';
import ManageStorage from './storage';
import Task from './task';

ManageStorage().initStore();

document.body.appendChild(DOM().layout());
const main = DOM().getMainElement();
const side = DOM().getSidebarElement();
const today = DOM().makeToday();
const sidelist = DOM().makeSidebar();
const addtask = DOM().addTask();

main.appendChild(today);
DOM().refreshTaskArea();
side.appendChild(sidelist);

todayEvent();
upcomingEvent();
addProjectEvent();

DOM().makeTaskList('2023-11-20');
