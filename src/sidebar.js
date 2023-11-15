import { elementClass } from './helpers.js';

function Sidebar() {
  const list = elementClass('ul', 'side-menu');
  const today = elementClass('li', 'today-item');
  const upcoming = elementClass('li', 'upcoming-item');
  const allTasks = elementClass('li', 'all-tasks');

  for (let item of [today, upcoming, allTasks]) {
    list.appendChild(item);
  }
  
  return { list, today, upcoming, allTasks };
}

export default Sidebar;

