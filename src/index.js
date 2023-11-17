import './style.css';
import DOM from './dom.js';
import { todayEvent, upcomingEvent } from './events.js';
import ManageStorage from './storage';
import Task from './task';
import Project from './project';

document.body.appendChild(DOM().layout());
const main = DOM().getMainElement();
const side = DOM().getSidebarElement();
const today = DOM().makeToday();
const sidelist = DOM().makeSidebar();

main.appendChild(today);
side.appendChild(sidelist);

todayEvent();
upcomingEvent();
ManageStorage().initStore();

let lookup = ManageStorage().storageLookup('Home', 'name');

console.log(typeof(lookup));
for (let item of lookup) {
  console.log(item.name);
}
