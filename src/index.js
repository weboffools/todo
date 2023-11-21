import './style.css';
import DOM from './dom.js';
import { todayEvent, upcomingEvent, addProjectEvent, } from './events.js';
import ManageStorage from './storage';

ManageStorage().initStore();

document.body.appendChild(DOM().layout());
const main = DOM().getMainElement();
const side = DOM().getSidebarElement();
const today = DOM().makeToday();
const sidelist = DOM().makeSidebar();

main.appendChild(today);
side.appendChild(sidelist);

const taskarea = DOM().getTaskAreas();
main.appendChild(DOM().refreshTaskArea(taskarea));

todayEvent();
upcomingEvent();
addProjectEvent();

