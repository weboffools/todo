import './style.css';
import DOM from './dom.js';
import { todayEvent, upcomingEvent } from './events.js';
import ManageStorage from './storage';


document.body.appendChild(DOM().layout());
const main = DOM().getMainElement();
const side = DOM().getSidebarElement();
const today = DOM().makeToday();
const sidelist = DOM().makeSidebar().list;

main.appendChild(today);
side.appendChild(sidelist);

todayEvent();
upcomingEvent();
ManageStorage().initStore();

